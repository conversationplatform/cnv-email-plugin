const { EmailProviders } = require("../services/email-providers");

module.exports = function (RED) {
    function EmailBodyTemplateConfig(n) {
        RED.nodes.createNode(this, n);
        this.body = n.body;
    }
    RED.nodes.registerType("cnv-email-body-template-config", EmailBodyTemplateConfig);
}
