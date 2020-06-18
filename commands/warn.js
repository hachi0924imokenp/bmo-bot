const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./modules/warnings.json", "utf8"));

exports.run = (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Vous n'avez pas la permission nécessaire à l'utilisation de cette commande.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    if(!wUser) return message.reply("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Impossible de warn un modérateur !");
    let reason = args.join(" ").slice(22);
  
    if(!warns[wUser.id]) warns[wUser.id] = {
      warns: 0
    };
  
    warns[wUser.id].warns++;
  
    fs.writeFile("./modules/warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err)
    });
  
    const logchan = message.guild.channels.cache.find(c=>["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name))
        setTimeout(function () {
            if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
                message.guild.channels.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : ${error}`));
      
            }
        }, 2000);
    
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) { 
        console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
    }   

    logchan.send({embed: {
        color: '#fc0703',
        author: {
        name: wUser.user.tag,
        icon_url: "https://cdn.discordapp.com/avatars/"+member.user.id+ "/"+member.user.avatar+".png"
    },
        title: "Warn",
        description: "Attention c'est le warn !",
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
            value: `<@${wUser.id}>`,
            inline: false,
        },
        {
            name: "ID",
            value: `${wUser.id}`,
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

    let warnchannel = message.guild.channels.cache.find(c=>["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name));
    if(!warnchannel) return message.reply("Je ne peux pas trouver le salon \'𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\'");
    
    if(warns[wUser.id].warns == 4){
    let muterole = message.guild.roles.cache.find(r => ["🏝️ No Man's Land"].includes(r.name));
    if(!muterole) return message.reply("Merci de crée un rôle nommée \'🏝️ No Man's Land\'");
  
      let mutetime = "5m";
      await(wUser.addRole(muterole.id));
      message.channel.send(`<@${wUser.id}> a été muté !`);
      
      const logchan = message.guild.channels.cache.find(c=>["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name))
        setTimeout(function () {
            if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
                message.guild.channels.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : ${error}`));
      
            }
        }, 2000);
    
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) { 
            console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
        }  

        logchan.send({embed: {
            color: '#fc0703',
            author: {
            name: wUser.user.tag,
            icon_url: "https://cdn.discordapp.com/avatars/"+tomute.user.id+ "/"+tomute.user.avatar+".png"
        },
            title: "Mute",
            description: "Get Jailed B*tch :D",
            thumbnail: {
                url:"https://cdn.discordapp.com/avatars/"+message.author.id+ "/"+message.author.avatar+".png",
            },
            fields: [{
                name: "Action",
                value: `Mute`,
                inline: false,
            },
            {
                name: "Nom d'utilisateur",
                value: `${wUser.user.tag}`,
                inline: false,
            },
            {
                name: "ID",
                value: `${wUser.user.id}`,
                inline: false,
            },
            {
                name: "Muté par",
                value: `${message.author.tag}`,
                inline: false,
            },
            {
                name: "ID du Modérateur",
                value: `${message.author.id}`,
                inline: false,
            },
            {
              name: "Temps",
              value: `${mutetime}`,
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
  
      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.reply(`<@${wUser.id}> a été unmute !`)
      }, ms(mutetime))
    }

    if(warns[wUser.id].warns == 10){
      message.guild.member(wUser).ban(reason);
      message.reply(`<@${wUser.id}> a été bannis`)

    const logchan = message.guild.channels.cache.find(c=>["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name))
      setTimeout(function () {
        if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
            message.guild.channels.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : ${error}`));
    
        }
    }, 2000);
  
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) { 
            console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
        }    

        logchan.send({embed: {
            color: '#fc0703',
            author: {
            name: wUser.user.tag,
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
                value: `${wUser.user.tag}`,
                inline: false,
            },
            {
                name: "ID",
                value: `${wUser.user.id}`,
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