const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args) => {
message.delete(message.author);

const duration = moment.duration(client.uptime).format(" D [Jours], H [heures], m [minutes], s [secondes]");
    message.channel.send({embed: {
    title: "Test :ok_hand:",
      color: 1752220,
      description: `Le bot fonctionne avec un uptime de ${duration}`,
      footer: {
        text:  "BMO" 
      }
    }}).then(function (message) {
        message.react(":BMOdance:704463259570405447")
    });
}
