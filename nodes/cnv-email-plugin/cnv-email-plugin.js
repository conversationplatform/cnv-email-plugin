const { checkForVariables } = require("../utils/msg-utils")

module.exports = function (RED) {
  function EmailPlugin(config) {
    RED.nodes.createNode(this, config);

    const { from, to, cc, subject, body } = config;
    const connection = RED.nodes.getNode(config.connection);

    this.on("input", function (msg, send, done) {
      console.log('EmailPlugin On input:', { connection, from, to, cc, subject, body });

      const variablesChecked = checkForVariables(body, msg);

      connection.sendEmail({ from, to, cc, subject, body: variablesChecked });

      send(msg);
      done();
    });
  }
  RED.nodes.registerType("cnv-email-plugin", EmailPlugin);
};
