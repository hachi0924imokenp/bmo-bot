module.exports = (globalVariables) => {
    Object.keys(globalVariables).map(variable => {
      global[variable] = globalVariables[variable];
    });

    async function command(message, args){
     
      var name = message.author.ursername;
      var discrim = message.auhor.discriminator;

      var bool = false

      message.guild.channels.cache.forEach((channel) => {
        if (channel.name === name.toLowerCase() + "-" + userDiscriminator) {
          const errembed = new Discord.MessageEmbed()
            .setTitle('Erreur')
            .setColor('#FF0000')
            .setDescription(`❌ Vous ne pouvez pas crée de ticket car vous avez déjà un ticket ouvert !`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();
          
          message.channel.send(errembed)
          bool = true;

          if (bool = true) return; 

          var embedCreateTicket = new discord.RichEmbed()
          .setTitle("Hey, " + message.author.username)
          .setFooter("Support channel will be made");
        }
      })

    
  }

command.options = {
  name: ["create"],
  enable: true
};

    return command;
}
