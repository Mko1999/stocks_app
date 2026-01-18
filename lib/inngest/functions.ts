import { inngest } from './client';
import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from './prompts';
import { sendNewsSummaryEmail, sendWelcomeEmail } from '../nodemailer';
import { getAllUsersForNewsEmail } from '../actions/user.actions';
import { getNews } from '../actions/finnhub.actions';
import { getWatchlistSymbolsByEmail } from '../actions/watchlist.actions';
import { getFormattedTodayDate } from '../utils';

export const sendSignupEmail = inngest.createFunction(
  { id: 'send-signup-email' },
  { event: 'app/user.created' },
  async ({ event, step }) => {
    const userProfile = `
    - Country: ${event.data.country}
    - Investment goals ${event.data.investmentGoals}
    - Risk tolerance: ${event.data.riskTolerance}
    - Preferred industry: ${event.data.preferredIndustry}
    `;
    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      '{{userProfile}}',
      userProfile
    );

    const response = await step.ai.infer('generate-welcome-intro', {
      model: step.ai.models.gemini({ model: 'gemini-2.5-flash' }),
      body: {
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
    });

    await step.run('send-welcome-email', async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && 'text' in part ? part.text : null) ||
        "Thanks for joining Signalist! As someone focused on technology growth stocks, you'll love our real-time alerts for companies like the ones you're tracking. We'll help you spot opportunities before they become mainstream news.";

      const {
        data: { email, name },
      } = event;

      return await sendWelcomeEmail({
        email,
        name,
        intro: introText,
      });
    });

    return {
      success: true,
      message: 'Welcome email sent successfully!',
    };
  }
);

export const sendDailyNewsSummary = inngest.createFunction(
  { id: 'send-daily-news-summary' },
  [{ event: 'app/send.daily.news' }, { cron: '0 12 * * *' }],
  async ({ step }) => {
    // Step 1: Get all users
    const users = await step.run(
      'get-all-users-for-news-email',
      getAllUsersForNewsEmail
    );

    if (!users || users.length === 0) {
      return { success: false, message: 'No users found for news email' };
    }

    // Step 2: For each user, get their watchlist symbols and fetch news
    const results = await step.run('fetch-user-news', async () => {
      const perUser: Array<{
        user: UserForNewsEmail;
        articles: MarketNewsArticle[];
      }> = [];
      for (const user of users) {
        try {
          const symbols = await getWatchlistSymbolsByEmail(user.email);
          let articles = await getNews(symbols);
          articles = articles.slice(0, 6);
          if (!articles || articles.length === 0) {
            articles = await getNews();
            articles = (articles || []).slice(0, 6);
          }
          perUser.push({ user, articles });
        } catch (e) {
          console.error('Error fetching user news', e);
          perUser.push({ user, articles: [] });
        }
      }
      return perUser;
    });

    const userNewsSummaries: {
      user: UserForNewsEmail;
      newsContent: string | null;
    }[] = [];
    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
          '{{newsData}}',
          JSON.stringify(articles, null, 2)
        );
        const response = await step.ai.infer(`summarize-news-${user.email}`, {
          model: step.ai.models.gemini({ model: 'gemini-2.5-flash' }),
          body: {
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        const newsContent =
          (part && 'text' in part ? part.text : null) ||
          '<p style="color: `#CCDADC`;">We were unable to generate your personalized news summary today. Please check back tomorrow for your market briefing.</p>';

        userNewsSummaries.push({ user, newsContent });
      } catch (e) {
        console.error('Failed to summarize news for user:', user.email, e);
        userNewsSummaries.push({ user, newsContent: null });
      }
    }

    // Step 4: Send the emails
    const date = getFormattedTodayDate();
    await step.run('send-news-summary-email', async () => {
      await Promise.all(
        userNewsSummaries.map(async ({ user, newsContent }) => {
          if (!newsContent) return;
          try {
            await sendNewsSummaryEmail({
              email: user.email,
              date,
              newsContent,
            });
          } catch (e) {
            console.error(
              'Failed to send news summary email for user:',
              user.email,
              e
            );
          }
        })
      );
    });

    return { success: true, message: 'News summary email sent successfully!' };
  }
);
