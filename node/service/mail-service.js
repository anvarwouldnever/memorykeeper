import nodemailer from "nodemailer";

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",  
            port: 587,
            auth: {
                user: "anvartashpulatov3@gmail.com",
                pass: "beta nvhw tpot urll"
            }
        })
    }

    async sendActivationMail(email, code) {
        try {
            await this.transporter.sendMail({
                from: "anvartashpulatov3@gmail.com",
                to: email,
                subject: code,
            });
            console.log('Письмо с активацией отправлено на почту:', email);
        } catch (error) {
            console.error('Ошибка при отправке письма:', error);
        }
    }
}

export default new MailService();
