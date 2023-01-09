const { checkForVariables } = require("../utils/msg-utils")
const markdown = require('markdown-it')();

module.exports = function (RED) {
  function EmailPlugin(config) {
    RED.nodes.createNode(this, config);

    const { from, to, cc, subject } = config;
    const connection = RED.nodes.getNode(config.connection);
    const body = RED.nodes.getNode(config.bodyTemplate).body;

    this.on("input", function (msg, send, done) {

      const variablesChecked = checkForVariables(body, msg);
      const result = markdown.render(variablesChecked);

      const emailParams = { from, to, cc, subject, body: result };
      console.log('EmailPlugin On input:', emailParams);

      connection.sendEmail(emailParams);

      send(msg);
      done();
    });
  }
  RED.nodes.registerType("cnv-email-plugin", EmailPlugin);
};
