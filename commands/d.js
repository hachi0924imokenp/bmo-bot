const config = require('../../config.json');
const Discord = require('discord.js')
const modRole = config.modRole;
const logchann = config.logsChannel;
const ms = require('ms');

module.exports.run = async(client, message, args) => {

    message.delete(message.author);

    if (!message.member.hasPermission('MANAGE_MEMBERS')) 
      return message.channel.send(`Sorry, <@` + message.author.id + `>, you do not have the necessary permission to use this command.`);

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!tomute) return message.channel.send("Please mention a user in the following form:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
    
    if(tomute.id === client.user.id) 
      return message.channel.send("Hahaha, i can't mute my self u dummy");

    if (tomute.user.bot) 
      return message.channel.send("U can't mute a bot u silly");

    if(tomute.id === message.author.id) 
      return message.channel.send("U can't mute yourself u dummy");

    if (tomute.hasPermission('MANAGE_MEMBERS')) 
      return message.channel.send("It's impossible to mute a moderator!");

    if(!tomute.hasPermission("KICK_MEMBERS")) {
      message.channel.send("U can't mute an user because u lack permission ! (Missing \`\`KICK_MEMBER\`\` permission)");
}
 
    let muterole = message.guild.roles.cache.find(r => ["Muted"].includes(r.name));
    if (!muterole) {
      try {
        muterole = await message.guild.roles.create({
          name: "Muted",
          color: "#ffd9000",
          permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            VIEW_CHANNELS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }

    let mutetime = args[1];
      if (!mutetime) return message.reply("You did not specify the time!");

    let reason = args.slice(2).join(' ');
      if (!reason) reason = "You committed an offense, so a moderator muted u";
    await (tomute.roles.add(muterole.id));
    
    client.users.cache.get(tomute);
    tomute.send(`${message.author.tag} muted u for: ${ms(ms(mutetime))} => ${reason}`)


    const logchan = message.guild.channels.cache.find(c => logchann.includes(c.name))
    setTimeout(function() {
      if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
        message.guild.channels.create('logs').catch(error => message.channel.send(`A error occurred while creating the \"logs\" : ${error}`));
      }
    }, 2000);
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
      console.log('The \'logs\' channel does not exist, and i tried to create it but I lack permissions !')
    }

    logchan.send({
      embed: {
        color: '#fc0703',
        author: {
          name: tomute.user.tag,
          icon_url: "https://cdn.discordapp.com/avatars/" + tomute.user.id + "/" + tomute.user.avatar + ".png"
        },
        title: "Mute",
        description: "Have been Muted",
        thumbnail: {
          url: "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png",
        },
        fields: [{
          name: "Action",
          value: `Mute`,
          inline: false,
        }, {
          name: "Username",
          value: `${tomute.user.tag}`,
          inline: false,
        }, {
          name: "ID",
          value: `${tomute.user.id}`,
          inline: false,
        }, {
          name: "Muted by",
          value: `${message.author.tag}`,
          inline: false,
        }, {
          name: "ID of moderator",
          value: `${message.author.id}`,
          inline: false,
        }, {
          name: "Time",
          value: `${mutetime}`,
          inline: false,
        }, {
          name: "Reason",
          value: `${reason}`,
          inline: false,
        }],
        timestamp: new Date(),
        footer: {
          icon_url: "https://cdn.discordapp.com/avatars/548209665092091904/0a0054900dc4827350258c01ffc08470.png?size=128",
          text: "Obama"
        }
      }
    });

    setTimeout(function() {
      tomute.roles.remove(muterole.id);
    }, ms(mutetime));
  }

module.exports.help = {
    name: "tempmute",
    enable: true
};

