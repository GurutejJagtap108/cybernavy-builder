import nodemailer from "nodemailer";

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!user || !pass) throw new Error("Email credentials not set");
  return transporter.sendMail({
    from: user,
    to,
    subject,
    html,
  });
}
