module.exports = (globalVariables) => {
    Object.keys(globalVariables).map(variable => {
      global[variable] = globalVariables[variable];
    });

    async function command(message, args){

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!member) 
            member = message.author;

        const info = new Discord.MessageEmbed()
          .setTitle('Informations')
          .setColor("#70f3ff")
          .setDescription(`Voici la liste des informations pour ${member}`);
        
        message.channel.send(info);
    }

    command.options = {
      name: ["info"],
      enable: true
    };
    
        return command;
}
    