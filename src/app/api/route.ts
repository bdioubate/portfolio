import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, object, message } = req.body

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
      subject: object || "Message du portfolio",
      text: `Nom: ${name}\nE-mail: ${email}\nMessage: ${message}`,
      html: `<p>Nom: ${name}\n E-mail: ${email}\n Message: ${message}</p>`,
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

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed. Only POST method is allowed.`);
}
