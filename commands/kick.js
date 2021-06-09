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
            return message.channel.send("<:objection:846329100683575296> bien essayé mais je ne peux pas me kick moi même !");
          
          if (member.user.bot) 
            return message.channel.send("<:objection:846329100683575296> Impossible de kick un bot !");
          
          if(member.id === message.author.id) 
            return message.channel.send("<:objection:846329100683575296> Vous ne pouvez pas vous kick vous-même");
      
          if (member.roles.cache.some(r => [config.permissions.owner, config.permissions.admin, config.permissions.mod].includes(r.name))) 
            return message.channel.send("<:objection:846329100683575296> Impossible de kick un modérateur !");
          
          if (!member.kickable) 
            return message.channel.send("<:objection:846329100683575296> Je ne ne peux pas kick cette utilisateur, ai-je la permissions nécessaire ? Suis-je assez haut ?");
          
          let reason = args.slice(2).join(' ');
            if (!reason) reason = "<a:slam1:846376062605983755><a:slam2:846376102347538462> Tu as commis une infraction, un modérateur t'a donc kick";
      
            const kicked = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
              client.users.cache.get(kicked);
                kicked.send(`Tu as été kick par ${message.author.tag} => ${reason}`).then(async () => {
                  await member.kick({
                    reason: reason,
                  }).catch(error => message.channel.send(`Désolé, je ne peux pas kick cette utilisateur à cause de : ${error}`));
                })
                  
            const info = message.guild.channels.cache.find(c => [config.info.logs].includes(c.name))
              setTimeout(function() {
                if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) {
                  message.guild.channels.create(config.info.modlogs).catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"informations\" : ${error}`));
                }
              }, 2000);
      
            if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) {
              console.log('Le salon des informations n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
            }
      
            const logchan = message.guild.channels.cache.find(c => [config.info.modlogs].includes(c.name))
              setTimeout(function() {
                if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
                  message.guild.channels.create(config.info.modlogs).catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝𝐥𝐨𝐠𝐬\" : ${error}`));
                }
              }, 2000);
  
            if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
              console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
            }
      
            info.send(`<a:slam:846360659004227615> ${member.user.tag} a été kick par ${message.author.tag}`);
                logchan.send({
                  embed: {
                    color: '#fc0703',
                    author: {
                      name: member.user.tag,
                      icon_url: "https://cdn.discordapp.com/avatars/" + member.user.id + "/" + member.user.avatar + ".png"
                    },
                    title: "Kick",
                    description: "<a:slam1:846376062605983755><a:slam2:846376102347538462> KICK !",
                    thumbnail: {
                      url: "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png",
                    },
                    fields: [{
                      name: "Action",
                      value: `Kick`,
                      inline: false,
                    }, {
                      name: "Nom d'utilisateur",
                      value: `${member.user.tag}`,
                      inline: false,
                    }, {
                      name: "ID",
                      value: `${member.user.id}`,
                      inline: false,
                    }, {
                      name: "Kick par",
                      value: `${message.author.tag}`,
                      inline: false,
                    }, {
                      name: "ID du Modérateur",
                      value: `${message.author.id}`,
                      inline: false,
                    }, {
                      name: "Raison",
                      value: `${reason}`,
                      inline: false,
                    }],
                    timestamp: new Date(),
                    footer: {
                      icon_url: "https://cdn.discordapp.com/avatars/" + client.user.id + "/" + client.user.avatar + ".png",
                      text: `${client.user.username}`
                    }
                  }
                });
        }
  
    command.options = {
      name: ["kick"],
      enable: true
    };
  
    return command;
  }
