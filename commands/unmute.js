module.exports = (globalVariables) => {
    Object.keys(globalVariables).map(variable => {
      global[variable] = globalVariables[variable];
    });
    
      async function command(message, args){
        if (!message.member.roles.cache.some(r => [config.permissions.owner, config.permissions.admins, config.permissions.mods].includes(r.name))) 
                return message.channel.send(`Désolé` + "<@" + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilistion de cette commande.`);
  
            let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  
            if (!member) 
                return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
        
            if(member.id === client.user.id)  
                return message.channel.send("<:objection:846329100683575296> bien essayé mais je ne peux pas me mute moi même !");
            
            if (member.user.bot) 
                return message.channel.send("<:objection:846329100683575296> Impossible de mute un bot !");
            
            if(member.id === message.author.id) 
                return message.channel.send("<:objection:846329100683575296> Vous ne pouvez pas vous mute vous-même");
        
            if (member.roles.cache.some(r => [config.permissions.owner, config.permissions.admin, config.permissions.mod].includes(r.name))) 
                return message.channel.send("<:objection:846329100683575296> Impossible de mute un modérateur !");
            
            let muterole = message.guild.roles.cache.find(r => r.name === config.permissions.mute); 
               if(!muterole) message.channel.send("Le rôle ${config.permissions.mute} n'existe pas, je ne peux donc pas unmute cette utilisateur")
        
           
            // Crée le salon d'info et le salon des logs de modération
                const info = message.guild.channels.cache.find(c => [config.info.logs].includes(c.name))
                  setTimeout(function() {
                    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) {
                      message.guild.channels.create(config.info.modlogs).catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon ${config.info.logs} : ${error}`));
                    }
                  }, 2000);

                if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) {
                  console.log('Le salon des informations n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
                }

                const logchan = message.guild.channels.cache.find(c => [config.info.modlogs].includes(c.name))
                  setTimeout(function() {
                    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
                      message.guild.channels.create(config.info.modlogs).catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon  ${config.info.logs} : ${error}`));
                    }
                  }, 2000);

                if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
                  console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
                }
                // Fin de la création des salons
                
                let reason = args.slice(3).join(' ');
            
                if (!reason) reason = '`Aucune raison ajouter`';
                if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
        
                if (!member.roles.cache.has(muterole.id))
                return message.channel.send('Cette utilisateur n\'est pas muet');
                
                try {
                  const mutedembed = new Discord.MessageEmbed()
                       .setTitle('Unmute')
                       .setColor('#fc0703')
                       .setDescription(`${member.user.tag} a été unmute.`)
                       .setThumbnail("https://cdn.discordapp.com/avatars/" + member.user.id + "/" + member.user.avatar + ".png")
                       .addFields(
                          { name: 'Action', value: `Unmute` },
                          { name: 'Modérateur', value: `${message.author.tag}` },
                          { name: 'ID du Modérateur', value: `${message.author.id}` },
                          { name: 'Utilisateur', value: `${member.user.tag}` },
                          { name: 'ID de l\'utilisateur', value: `${member.user.id}` },
                          { name: 'Raison', value: `${reason}` },
                       )
                      .setFooter(`${client.user.username}`, "https://cdn.discordapp.com/avatars/" + client.user.id + "/" + client.user.avatar + ".png")
                      .setTimestamp();

                      await member.roles.remove(muterole);
                      info.send(`<a:slam:846360659004227615> ${member.user.tag} a été unmute par ${message.author.tag}`);
                      logchan.send(mutedembed);
                      member.send(`Tu as été unmute par ${message.author.tag} => ${reason}`);
                } catch (err) {
                    console.log(err)
                    return message.channel.send('Une erreur est survenue, merci de vérifier la hiérarchie des rôles', err.message);
                }
     }  
    
    command.options = {
      name: ["unmute", "demute"],
      enable: true
    };
    
     return command;
}
