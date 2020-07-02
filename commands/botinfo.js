module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });
  
  async function command(message, args){
    message.delete(message.author);
    if (!message.author.id !== ownerID) {
      return message.channel.send("Vous n'êtes pas mon créateur !")
    }
    
    let package = require("../../package.json");

    const infobot = new Discord.MessageEmbed()
      .setTitle('Informations du bot')
      .setColor('#17ffe4')
      .setDescription(`Voice les informations`)
      .addFields(
        { name: 'Version de NodeJS', value: 'Not Set' },
        { name: 'Nom du Package', value: `${package.name}` },
        { name: 'Description', value: '__**Informations**__ :' },
        { name: 'Fichier principal (index)', value: '__**Informations**__ :' },
        { name: 'Version du Bot', value: '__**Informations**__ :' },
        { name: 'Version de discord.js', value: '__**Informations**__ :' },
        { name: 'Version de Forever', value: '__**Informations**__ :' },
        { name: 'moment', value: '__**Informations**__ :' },
        { name: 'moment-duration-format', value: '__**Informations**__ :' },
        { name: 'npm', value: '__**Informations**__ :' },
        { name: 'string-hash', value: '__**Informations**__ :' },
        { name: 'License type', value: 'MIT' },

      )
      .setFooter('© BMO', client.user.avatarURL)
      .setTimestamp();

    message.channel.send(infobot);
  }

  command.options = {
    name: ["botinfo"],
    enable: true
  };

  return command;
}
