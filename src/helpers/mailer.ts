import nodemailer from "nodemailer";
import User from "@/models/userModel.js";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // 1. Create a unique token
    const hashedToken = crypto.randomBytes(32).toString("hex");

    // 2. Update the Database
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // 3. Configure the Transport (SMTP Method)
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "08125682840f56", // Use your actual credentials
        pass: "4de3d3269945a8",
      },
    });

    // 4. Define Mail Options
    const mailOptions = {
      from: "no-reply@yourapp.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset password",
      html: `
        <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
        to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
        <br>Or copy and paste this link: <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`,
    };

    // 5. Send the mail
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    console.error("Email Error:", error.message);
    throw new Error(error.message);
  }
};