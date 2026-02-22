import nodemailer from 'nodemailer';

const createTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

export const sendVerificationEmail = async (to: string, url: string) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Stocks App" <${process.env.NODEMAILER_EMAIL}>`,
    to,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Verify your email</h2>
        <p>Thanks for signing up! Click the button below to verify your email address.</p>
        <a
          href="${url}"
          style="display:inline-block;padding:12px 24px;background:#f59e0b;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;"
        >
          Verify Email
        </a>
        <p style="margin-top:16px;color:#6b7280;font-size:14px;">
          If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};
