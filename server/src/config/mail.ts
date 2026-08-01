import nodemailer from "nodemailer";
import { env } from "./env";

/**
 * Create SMTP Transporter
 */
const transporter = nodemailer.createTransport({
  host: env.SMTP.HOST,
  port: env.SMTP.PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: env.SMTP.USER,
    pass: env.SMTP.PASS,
  },
});

/**
 * Verify SMTP Connection
 */
export const verifyMailConnection = async (): Promise<void> => {
  try {
    await transporter.verify();
    console.log("✅ Mail server connected successfully.");
  } catch (error) {
    console.error("❌ Mail server connection failed:", error);
    process.exit(1);
  }
};

/**
 * Send Email
 */
interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({
  to,
  subject,
  html,
}: SendMailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"AI Disaster Response" <${env.SMTP.USER}>`,
      to,
      subject,
      html,
    });

    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};

export default transporter;