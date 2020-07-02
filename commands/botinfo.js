module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });
  
  async function command(message, args){
    message.delete(message.author);
    if (message.author.id !== ownerID) {
      return message.channel.send("Vous n'êtes pas mon créateur !")
    }
    
    let package = require("./package.json");

    const infobot = new Discord.MessageEmbed()
      .setTitle('Informations du bot')
      .setColor('#17ffe4')
      .setDescription(`Voice les informations`)
      .addFields(
        { name: 'Version de NodeJS', value: 'Not Set' },
        { name: 'Nom du Package', value: `\`\`\`BMO\`\`\`` },
        { name: 'Description', value: '\`\`\`A Discord Bot\`\`\`' },
        { name: 'Fichier principal (index)', value: '\`\`\`index.js\`\`\`' },
        { name: 'Version du bot', value: '\`\`\`2.0.0\`\`\`' },
        { name: 'Version de discord.js', value: '\`\`\`^12.2.0\`\`\`' },
        { name: 'Version de forever', value: '\`\`\`^3.0.0\`\`\`' },
        { name: 'Version de moment', value: '\`\`\`^2.26.0\`\`\`' },
        { name: 'Version de moment-duration-format', value: '\`\`\`^2.3.2\`\`\`' },
        { name: 'npm', value: '\`\`\`^6.14.15\`\`\`' },
        { name: 'string-hash', value: '\`\`\`^1.1.3\`\`\`' },
        { name: 'ms', value: '\`\`\`^2.1.2\`\`\`' },
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
