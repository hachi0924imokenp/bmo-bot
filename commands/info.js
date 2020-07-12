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
            .setColor('#7dffb3')
            .setAuthor(`${member.id}`)
            .setDescription(`Voici les informations de ${member.id}`)
            .addThumbnail(member.avatarURL)
            .addFields(
                { name: 'Pseudo', value: `${member.tag}`, inline: false },
                { name: 'Tag', value: `${member.discriminator}`, inline: false },
                { name: 'Mention', value: `${member.tag}`, inline: false },
                { name: 'ID', value: `<@${member.id}>`, inline: false },
                { name: `A rejoint ${message.guild.id} le`, value: `${member.joinedAt}`, inline: false },
                { name: `A rejoint Discord le`, value: `${member.createdAt}`, inline: false },
            )
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();
        
        message.channel.send(info);
    }

    command.options = {
      name: ["info"],
      enable: true
    };
    
        return command;
}
    