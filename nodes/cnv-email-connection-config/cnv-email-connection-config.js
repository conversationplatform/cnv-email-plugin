const { EmailProviders } = require("../services/email-providers");

module.exports = function (RED) {
    function EmailConnectionConfig(n) {
        RED.nodes.createNode(this, n);
        this.provider = n.provider;
        this.apiKey = n.apikey;
        this.apiSecret = n.apisecret;

        this.sendEmail = (emailConfig) => {
            try {
                EmailProviders[this.provider].sendEmail(emailConfig, this.apiKey, this.apiSecret);
            } catch (error) {
                console.error(error);
            }
        }
    }
    RED.nodes.registerType("cnv-email-connection-config", EmailConnectionConfig);
}
