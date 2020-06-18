const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./modules/warnings.json", "utf8"));

exports.run = async (client, message, args) => {
    message.delete(message.author);

    if(!message.member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé`+"<@" + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilistion de cette commande.`);

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!member) return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
    
    if (member.user.bot)
        return message.channel.send("Impossible de warn un bot !");

    if(member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send("Impossible de warn un modérateur !");

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
        if(!wUser) return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
    
    let reason = args.join(" ").slice(22);
        if(!reason) reason = "Tu as commis une infraction, un modérateur t'a donc Warn";

        if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
          };
        
        warns[wUser.id].warns++;

    fs.writeFile("./modules/warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err)
    });

    const info = message.guild.channels.cache.find(c=>["informations"].includes(c.name))
        setTimeout(function () {
            if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) {
                message.guild.channels.create('informations').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"informations\" : ${error}`));
        
            }   
        }, 2000);
    
            if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !info) { 
                console.log('Le salon des informations n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
            }
    
    const logchan = message.guild.channels.cache.find(c=>["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name))
        setTimeout(function () {
            if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
                message.guild.channels.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : ${error}`));
      
            }
        }, 2000);
    
            if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) { 
                console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
            }   
        
    info.send(`${member.user.tag} a été warn par ${message.author.tag}`);
    logchan.send({embed: {
            color: '#fc0703',
            author: {
            name: member.user.tag,
            icon_url: "https://cdn.discordapp.com/avatars/"+member.user.id+ "/"+member.user.avatar+".png"
            },
            title: "Warn",
            description: "C'est la réputation qui en prends un coup !",
            thumbnail: {
                url:"https://cdn.discordapp.com/avatars/"+message.author.id+ "/"+message.author.avatar+".png",
            },
            fields: [{
                name: "Action",
                value: `Warn`,
                inline: false,
            },
            {
                name: "Nom d'utilisateur",
                value: `${member.user.tag}`,
                inline: false,
            },
            {
                name: "ID",
                value: `${member.user.id}`,
                inline: false,
            },
            {
                name: "Warn par",
                value: `${message.author.tag}`,
                inline: false,
            },
            {
                name: "ID du Modérateur",
                value: `${message.author.id}`,
                inline: false,
            },
            {
                name: "Raison",
                value: `${reason}`,
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

    if(warns[wUser.id].warns == 4){
    let muterole =  message.guild.roles.cache.find(r => ["🏝️ No Man's Land"].includes(r.name));
    if(!muterole) return message.reply("Impossible de trouver le rôle '🏝️ No Man's Land', vous devez le crée !");
    
    let mutetime = "1h";
        await(wUser.roles.add(muterole.id));
        message.channel.send(`<@${wUser.id}> a été temporairement mute `);
        
    setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.channel.send(`<@${wUser.id}> a été unmute`)
        }, ms(mutetime))
    }

    if(warns[wUser.id].warns == 10){
        message.guild.member(wUser).ban(reason);
        message.channel.send(`<@${wUser.id}> a été bannis`)
        logchan.send({embed: {
            color: '#fc0703',
            author: {
            name: member.user.tag,
            icon_url: "https://cdn.discordapp.com/avatars/"+member.user.id+ "/"+member.user.avatar+".png"
        },
            title: "Bannissement",
            description: "Le Ban Hammer est tombé !",
            thumbnail: {
                url:"https://cdn.discordapp.com/avatars/"+message.author.id+ "/"+message.author.avatar+".png",
            },
            fields: [{
                name: "Action",
                value: `Ban`,
                inline: false,
            },
            {
                name: "Nom d'utilisateur",
                value: `${member.user.tag}`,
                inline: false,
            },
            {
                name: "ID",
                value: `${member.user.id}`,
                inline: false,
            },
            {
                name: "Bannis par",
                value: `${message.author.tag}`,
                inline: false,
            },
            {
                name: "ID du Modérateur",
                value: `${message.author.id}`,
                inline: false,
            },
            {
                name: "Raison",
                value: `${reason}`,
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
}
