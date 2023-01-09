const sgMail = require('@sendgrid/mail');
const Mailjet = require('node-mailjet');


const EmailProviders = {
    sendgrid: {
        sendEmail: (config, apiKey) => {
            const { to, from, cc, subject, body: html } = config;
            console.log('sending email via sendgrid with config:', config)

            sgMail.setApiKey(apiKey);

            const request = sgMail.send({ to, from, cc, subject, html });
            request.then(result => {
                console.log(result);
            }, error => {
                console.error(error);
            });
        }
    },
    mailjet: {
        sendEmail: (config, apiKey, apiSecret) => {
            console.log('sending email via mailjet with config:', config)

            const mailjet = Mailjet.apiConnect(apiKey, apiSecret);
            const request = mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [
                        {
                            "From": { "Email": config.from },
                            "To": [{ "Email": config.to }],
                            "Cc": [{ "Email": config.cc }],
                            "Subject": config.subject,
                            "HTMLPart": config.body,
                        }
                    ]
                });

            request.then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            })

        }
    },
};

module.exports = { EmailProviders }