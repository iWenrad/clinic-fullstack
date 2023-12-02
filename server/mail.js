import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const { 
    EMAIL_HOST, 
    EMAIL_HOST_PASSWORD, 
    EMAIL_HOST_USER, 
    EMAIL_PORT } = process.env;

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

    async send(reciever, message) {
        try {
            const info = await this.#transporter.sendMail({
                from: 'test@gmail.com',
                to: reciever,
                subject: 'Clinic site',
                text: message[0],
                html: `<h1>
                            ${message[0]}
                        </h1>
                        <p>${message[1]}</p>`
            })
            return info.messageId
        } catch (e) {
            throw e;
        }
    }

}

export default new Mail();