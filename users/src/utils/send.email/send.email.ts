import nodemailer from 'nodemailer';

export class emailSender {
  public static async send(options: { email: string; subject: string; message: string }) {
    try {
      //create transporter to send the mail:transporter is a service(gmail) which actually send the mail
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        //port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const { email, subject, message } = options;
      // Construct the email message:DEFINE EMAIL OPTIONS
      const mailObject = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: subject,
        text: message,
      };

      // Send mail with defined transport object
      const info = await transporter.sendMail(mailObject);
      console.log(`Message sent: ${info.messageId}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
