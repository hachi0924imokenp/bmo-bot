module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function command(message, args){
    message.delete(message.author);
    const duration = moment.duration(client.uptime).format("D [Jour(s)], H [heure(s)], m [minute(s)], S [seconde(s)]");
    message.channel.send({
      embed: {
        title: "Test :ok_hand:",
        color: 1752220,
        description: `Le bot fonctionne avec un uptime de ${duration}`,
        footer: {
          text: "BMO"
        }
      }
    }).then(function(message) {
      message.react(":BMOdance:704463259570405447")
    });
  }

  command.options = {
    name: ["test"],
    enable: true
  };

  return command;
}
