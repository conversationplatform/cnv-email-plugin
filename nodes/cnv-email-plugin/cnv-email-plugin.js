const { checkForVariables } = require("../utils/msg-utils")
const markdown = require('markdown-it')();

module.exports = function (RED) {
  function EmailPlugin(config) {
    RED.nodes.createNode(this, config);

    const { from, to, cc, bcc, subject } = config;
    const connection = RED.nodes.getNode(config.connection);
    const body = RED.nodes.getNode(config.bodyTemplate).body;

    this.on("input", function (msg, send, done) {
      const toWithVariables = to.map(t => checkForVariables(t, msg));
      const ccWithVariables = cc.map(c => checkForVariables(c, msg));
      const bccWithVariables = bcc.map(b => checkForVariables(b, msg));
      const bodyWithVariables = checkForVariables(body, msg);
      const bodyRendered = markdown.render(bodyWithVariables);

      const emailParams = { from, to: toWithVariables, cc: ccWithVariables, bcc: bccWithVariables, subject, body: bodyRendered };

      connection.sendEmail(emailParams);

      send(msg);
      done();
    });
  }
  RED.nodes.registerType("cnv-email-plugin", EmailPlugin);
};
