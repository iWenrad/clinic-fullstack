import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const {
    EMAIL_HOST,
    EMAIL_HOST_PASSWORD,
    EMAIL_HOST_USER,
    EMAIL_PORT,
    EMAIL_GET_USER } = process.env;

class Mail {
    #transporter = null;

    constructor() {
        this.#transporter = this.#getTransporter();
    }

    #getTransporter() {
        return nodemailer.createTransport({
            host: EMAIL_HOST,
            port: EMAIL_PORT,
            secure: false,
            auth: {
                user: EMAIL_HOST_USER,
                pass: EMAIL_HOST_PASSWORD
            }
        })
    }

    async send(name, email, message) {
        try {
            const info = await this.#transporter.sendMail({
                from: 'test@gmail.com',
                to: EMAIL_GET_USER,
                subject: 'Clinic site',
                text: message[0],
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Feedback for Doctor</title>
                </head>
                <body>
                  <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #3498db;">Patient Feedback</h1>
                    <p style="color: #333; font-size: 16px;">Dear Clinica WP,</p>
                    <p style="color: #333; font-size: 16px;">You have received feedback from a patient:</p>
                    
                    <ul>
                      <li><strong>Patient Name:</strong> ${name}</li>
                      <li><strong>Patient Email:</strong> ${email}</li>
                      <li><strong>Feedback:</strong> ${message}</li>
                    </ul>
                
                    <p style="color: #333; font-size: 16px;">Please review the feedback and respond at your earliest convenience.</p>
                    <p style="color: #333; font-size: 16px;">Best regards,<br>The Medical Practice Team</p>
                  </div>
                </body>
                </html>
                `
            })
            return info.messageId
        } catch (e) {
            throw e;
        }
    }

}

export default new Mail();