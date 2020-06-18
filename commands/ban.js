exports.run = async (client, message, args) => {
    
    message.delete(message.author);
    
    if(!message.member.roles.cache.some(r=>["🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé`+"<@" + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilistion de cette commande.`);

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!member) return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
    
    if (member.user.bot)
        return message.channel.send("Impossible de bannir un bot !");

    if(member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send("Impossible de bannir un modérateur !");
  
    if(!member.bannable)
        return message.channel.send("Je ne ne peux pas bannir cette utilisateur, Ais-je la permissions nécessaire ? Suis-je assez haut ?");

    let reason = args.slice(1).join(' ');
        if(!reason) reason = "Tu as commis une infraction, un modérateur t'a donc bannis";
    
    const banned = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
        client.users.cache.get(banned);
          banned.send(`Tu as été bannis par ${message.author.tag} ===> ${reason}`);
    
    await member.ban(reason)
        .catch(error => message.channel.send(`Désolé, je ne peux pas bannir cette utilisateur à cause de : ${error}`));
  
    const info = message.guild.channels.cache.find(c=>["informations"].includes(c.name))
    setTimeout(function () {
        if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) {
            message.guild.channels.create('informations').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"informations\" : ${error}`));
    
        }   
    }, 5000);

        if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) { 
            console.log('Le salon des informations n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
        }
        info.send(`${member.user.tag} a été bannis par ${message.author.tag}`);

    const logchan = message.guild.channels.cache.find(c=>["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name))
        if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
            message.guild.channels.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : ${error}`));
  
        }
  
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) { 
            console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
        }   

    logchan.send({embed: {
        color: '#fc0703',
        author: {
        name: member.user.tag,
        icon_url: "https://cdn.discordapp.com/avatars/"+member.user.id+ "/"+member.user.avatar+".png"
    },
        title: "Bannissement",
        description: "Le ban hammer est tombé !",
        thumbnail: {
            url:"https://cdn.discordapp.com/avatars/"+message.author.id+ "/"+message.author.avatar+".png",
        },
        fields: [{
            name: "Nom d'utilisateur",
            value: `${member.user.tag}`,
            inline: true,
        },
        {
            name: "ID",
            value: `${member.user.id}`,
            inline: true,
        },
        {
            name: "Bannis par",
            value: `${message.author.tag}`,
            inline: true,
        },
        {
            name: "ID du Modérateur",
            value: `${message.author.id}`,
            inline: true,
        },
        {
            name: "Raison",
            value: `Tu as été bannis par ${message.author.tag} ===> ${reason}`,
            inline: false,
        }
    ],
        timestamp: new Date(),
        footer: {
        icon_url: "https://cdn.discordapp.com/avatars/548209665092091904/0a0054900dc4827350258c01ffc08470.png?size=128",
        text: "© BMO"
        }
    }
    });
  
}
