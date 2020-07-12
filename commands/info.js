module.exports = (globalVariables) => {
    Object.keys(globalVariables).map(variable => {
      global[variable] = globalVariables[variable];
    });

    async function command(message, args){

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!member) 
            member = `<@${message.author.id}>`

        const info = new Discord.MessageEmbed()
          .setTitle('Informations')
          .setDescription(`Voici la liste des informations pour ${member.id}`);
        
        message.channel.send(info);
    }

    command.options = {
      name: ["info"],
      enable: true
    };
    
        return command;
}
    