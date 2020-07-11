module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function command(message, args){
    message.delete(message.author);
    if (!message.member.roles.cache.some(r => ["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name))) 
      return message.channel.send(`Désolé <@` + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilistion  de cette commande.`);
    
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!tomute) 
      return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
    
    if(tomute.id === client.user.id) 
      return message.channel.send("Hahaha, bien essayer mais je ne peux pas m\'envoyer en prison !");
    
    if (tomute.user.bot) 
      return message.channel.send("Impossible d'envoyer un bot en prison !");
    
    if(tomute.id === message.author.id) 
      return message.channel.send("Vous ne pouvez pas vous envoyer en prison vous-même");
    
    if (tomute.roles.cache.some(r => ["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name))) 
      return message.channel.send("Impossible d'envoyer un modérateur en prison !");
    
    let muterole = message.guild.roles.cache.find(r => ["🏝️ No Man's Land"].includes(r.name));
    if (!muterole) {
      try {
        muterole = await message.guild.roles.create({
          data: {
            name: "🏝️ No Man's Land",
            color: "#ffd9000",
            permissions: []
          },
          reason: `Mute an user`
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions([
            {
              id: guild.id,
		          deny: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_GUILD, '],
	          }]);
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    
    let mutetime = args[2];
    if (!mutetime) return message.reply("Vous n'avez pas spécifié le temps !");

    let reason = args.slice(3).join(' ');
    if (!reason) reason = "Tu as commis une infraction, un modérateur t'a donc envoyé(e) en prison";
    await (tomute.roles.add(muterole.id));
    client.users.cache.get(tomute);
    
    tomute.send(`${message.author.tag} t'envoie en prison ${ms(ms(mutetime))} => ${reason}`)
    
    const info = message.guild.channels.cache.find(c => ["informations"].includes(c.name))
    setTimeout(function() {
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) {
        message.guild.channels.create('informations').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"informations\" : ${error}`));
      }
    }, 2000);
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) {
      console.log('Le salon des informations n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
    }
    
    const logchan = message.guild.channels.cache.find(c => ["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name))
    setTimeout(function() {
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
        message.guild.channels.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : ${error}`));
      }
    }, 2000);
    
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
      console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
    }
    
    info.send(`${tomute.user.tag} a été mis en prison par ${message.author.tag}`); 
    logchan.send({
      embed: {
        color: '#fc0703',
        author: {
          name: tomute.user.tag,
          icon_url: "https://cdn.discordapp.com/avatars/" + tomute.user.id + "/" + tomute.user.avatar + ".png"
        },
        title: "Mute",
        description: "Get Jailed B*tch :D",
        thumbnail: {
          url: "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png",
        },
        fields: [{
          name: "Action",
          value: `Mute`,
          inline: false,
        }, {
          name: "Nom d'utilisateur",
          value: `${tomute.user.tag}`,
          inline: false,
        }, {
          name: "ID",
          value: `${tomute.user.id}`,
          inline: false,
        }, {
          name: "Muté par",
          value: `${message.author.tag}`,
          inline: false,
        }, {
          name: "ID du Modérateur",
          value: `${message.author.id}`,
          inline: false,
        }, {
          name: "Temps",
          value: `${mutetime}`,
          inline: false,
        }, {
          name: "Raison",
          value: `${reason}`,
          inline: false,
        }],
        timestamp: new Date(),
        footer: {
          icon_url: client.avatarURL,
          text: "© BMO"
        }
      }
    });
    
    setTimeout(function() {
      tomute.roles.remove(muterole.id);
    }, ms(mutetime));
  }

  command.options = {
    name: ["mute"],
    enable: true
  };

  return command;
}
