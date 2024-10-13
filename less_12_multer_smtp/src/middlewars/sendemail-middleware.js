import { promises as fs } from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';

const __dirname = import.meta.dirname;
const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;
if (!NODEMAILER_PASSWORD || !NODEMAILER_USER) {
  throw new Error(
    "NODEMAILER_USER or NODEMAILER_PASSWORD env variable is missing"
  );
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD,
  },
});

export async function sendEmail(req, res, next) {
  try {
    if(!req.body.email) {
        res.sendStatus(400);
        return;
    }
    const email = req.body.email;
        
    const filePath = path.join(__dirname, "..", "data", "email.html");
    const content = await fs.readFile(filePath, "utf-8");

    await transporter.sendMail({
      from: NODEMAILER_USER,
      to: email,
      subject:
        "URGENT!!! Ethiopian King Needs YOUR Help to Transfer $50 MILLION!!!",
      html: content,
    });

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }  
}
