module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });
  
  async function command(message, args){
    message.delete(message.author);
    if (message.author.id !== ownerID) {
      return message.channel.send("Vous n'êtes pas mon créateur !")
    }
    
    let package = require("../package.json");

    const infobot = new Discord.MessageEmbed()
      .setTitle('Informations du bot')
      .setColor('#17ffe4')
      .setDescription(`Voice les informations tiré du fichier [package.json](https://github.com/Cleaner-Discord/bmo-bot/blob/master/package.json 'node.js modules list')\n\nIci sont afficher toute les dépendences installer !`)
      .addFields(
        { name: 'Version de NodeJS', value: 'Not Set' },
        { name: 'Nom du Package', value: `\`\`\`${package.name}\`\`\`` },
        { name: 'Description', value: `\`\`\`${package.description}\`\`\`` },
        { name: 'Fichier principal (index)', value: `\`\`\`${package.main}\`\`\`` },
        { name: 'Version du bot', value: `\`\`\`${package.version}\`\`\`` },
        { name: 'Version de discord.js', value: `\`\`\`${package.discordjs}\`\`\`` },
        { name: 'Version de forever', value: `\`\`\`${package.forever}\`\`\`` },
        { name: 'Version de moment', value: `\`\`\`${package.moment}\`\`\`` },
        { name: 'Version de moment-duration-format', value: `\`\`\`${package.moment-duration-format}\`\`\`` },
        { name: 'npm', value: `\`\`\`${package.npm}\`\`\`` },
        { name: 'string-hash', value: `\`\`\`${package.string-hash}\`\`\`` },
        { name: 'ms', value: `\`\`\`${package.ms}\`\`\`` },
        { name: 'License type', value: `\`\`\`${package.license}\`\`\`` },
        { name: '\u200B', value: `\u200B` },
        { name: 'Besoin d\'afficher le changelog ?', value: `[Cliquer ici pour afficher le readme.md](https://github.com/Cleaner-Discord/bmo-bot/blob/master/readme.md 'BMO Changelog') ou éxécuter la commande b!changelog` },

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
