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
    const dependencies = require("./package.json").dependencies

    const infobot = new Discord.MessageEmbed()
      .setTitle('Satistiques')
      .setColor('#17ffe4')
      .setDescription(`Voice les informations et statistiques du bot`)
      .addFields(
        { name: '⚒️ **Système**', value: "\u200B", inline: true },
        { name: 'Version de Discord.js', value: "NaN", inline: false },
        { name: 'Seveurs', value: "NaN", inline: false },
        { name: 'Utilisateurs', value: "NaN", inline: false },
        { name: 'Version', value: package.version, inline: false },
        { name: 'Mémoire', value: "NaN", inline: false },
        { name: 'Uptime', value: `${duration}`, inline: false },
        { name: '⚙️Dépendences', value: "```"+dependencies+"```", inline: false },
        { name: '\u200B', value: "📃 **À propos**", inline: false },
        { name: '\u200B', value: `Je suis ${client.user.name}, un bot écrit en JavaScript à l'aide de **Discord.js**.\n\nJ'ai été crée par ${ownerID} avec une multitide de commandes\nPour ma liste de commandes, s'il vous plaît faites \`\`${prefix}help\`\``, inline: false },
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
