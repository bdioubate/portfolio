import { NextApiResponse } from 'next';
import { NextResponse, NextRequest } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        ciphers: process.env.TLS_CIPHERS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_RECEIVER,
      subject: "Message du portfolio",
      text: `Nom: \nE-mail: \nMessage: `,
      html: `<p>Nom: \n E-mail: \n Message: </p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    res.statusCode = 200;
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error sending email:", error);
    res.statusCode = 500;
    return NextResponse.json({ success: false, error: "Error sending email" });
  }
}