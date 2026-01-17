import { inngest } from './client';
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from './prompts';
import { sendWelcomeEmail } from '../nodemailer';

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
      model: step.ai.models.gemini({ model: 'gemini-2.0-flash-lite' }),
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
