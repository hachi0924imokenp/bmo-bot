module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function command(message, args){
    message.channel.send('Réinitialisation de la connexion...').then(msg => client.destroy()).then(() => client.login(process.env.BOT_TOKEN));
  }

  command.options = {
    name: ["reset"],
    enable: true
  };

  return command;
}
