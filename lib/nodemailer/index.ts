import nodemailer from 'nodemailer';
import {
  NEWS_SUMMARY_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from './templates';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const html = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace(
    '{{intro}}',
    intro
  );

  const mailOptions = {
    from: '"Signalist" <signalist@signalist.app>',
    to: email,
    subject: 'Welcome aboard Signalist - your stock market toolkit is ready!',
    html,
  };

  await transporter.sendMail(mailOptions);
};

export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: NewsSummaryEmailData) => {
  const html = NEWS_SUMMARY_EMAIL_TEMPLATE.replace('{{date}}', date).replace(
    '{{newsContent}}',
    newsContent
  );

  const mailOptions = {
    from: '"Signalist" <signalist@signalist.app>',
    to: email,
    subject: 'Your Daily Market Briefing 📰',
    html,
  };

  await transporter.sendMail(mailOptions);
};
