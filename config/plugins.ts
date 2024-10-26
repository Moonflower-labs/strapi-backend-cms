export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT", 465),
        auth: {
          user: env("MAIL_USER"),
          pass: env("MAIL_PASSWORD"),
        },
        tls: {
          rejectUnauthorized: process.env.NODE_ENV === "production",
        },
      },
      debug: true,
      settings: {
        defaultFrom: "admin@thechicnoir.com",
        defaultReplyTo: "admin@thechicnoir.com",
      },
    },
  },
});
