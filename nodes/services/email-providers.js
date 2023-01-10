const sgMail = require('@sendgrid/mail');
const Mailjet = require('node-mailjet');


const EmailProviders = {
    sendgrid: {
        sendEmail: (config, apiKey) => {
            const { to, from, cc, bcc, subject, body: html } = config;
            console.log('sending email via sendgrid with config:', config)

            sgMail.setApiKey(apiKey);

            const request = sgMail.send({ to, from, cc, bcc, subject, html });
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

            const newMailObject = (mail) => ({ Email: mail });

            const mailjet = Mailjet.apiConnect(apiKey, apiSecret);

            const message = {
                From: newMailObject(config.from),
                To: config.to.map(to => newMailObject(to)),
                Cc: config.cc.map(cc => newMailObject(cc)),
                Bcc: config.bcc.map(bcc => newMailObject(bcc)),
                Subject: config.subject,
                HTMLPart: config.body,
            };
            const request = mailjet.post("send", { 'version': 'v3.1' }).request({ "Messages": [message] });

            request.then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            })

        }
    },
};

module.exports = { EmailProviders }