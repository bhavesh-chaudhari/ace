import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { google } from "googleapis";

dotenv.config({ path: "./config/.env" });
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauth/playground";
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const BUSSINESS_EMAIL = process.env.BUSSINESS_EMAIL;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendMail = async (mailTo, mailSubject, mailText, mailHtml) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    console.log("This is mail html: " ,mailHtml)

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "explorerd515@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    console.log(`Ace IIITN ${BUSSINESS_EMAIL}`)
    
    const mailOptions = {
      from: `Ace Dora ${BUSSINESS_EMAIL}`,
      to: mailTo,
      subject: mailSubject,
      text: mailText,
      html: mailHtml,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};