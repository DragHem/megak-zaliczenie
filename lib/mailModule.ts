import nodemailer from "nodemailer";

export abstract class MailModule {
  private static transporter = nodemailer.createTransport({
    host: "poczta.o2.pl",
    port: 465,
    secure: true,
    auth: {
      user: "kittyproject@o2.pl",
      pass: "trudnehaslo123",
    },
  });

  static async sendMail(
    to: string,
    subject: string,
    text: string,
    from: string
  ) {
    const message = {
      from: `${from} <kittyproject@o2.pl>`,
      to,
      subject,
      text,
      // html: `<p>${from}</p>`,
    };

    return this.transporter.sendMail(message);
  }
}
