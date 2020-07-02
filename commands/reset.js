module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function command(message, args){
    if(message.author.id !== ownerID) return;
    message.channel.send('Réinitialisation de la connexion...').then(msg => client.destroy()).then(() => client.login(process.env.BOT_TOKEN));
  }

  command.options = {
    name: ["reset"],
    enable: true
  };

  return command;
}
