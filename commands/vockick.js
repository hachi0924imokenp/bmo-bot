module.exports = (globalVariables) => {
    Object.keys(globalVariables).map(variable => {
      global[variable] = globalVariables[variable];
    });
  
    async function command(message, args) {
        if (!message.guild.me.hasPermission('MOVE_MEMBERS')) return message.reply('J\'ai besoin de la permission `MOVE_MEMBERS` afin d\'exécuter cette commande.');
        const member = message.mentions.members.first();
        if (!member) return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
        if (!member.voiceChannel) return message.reply('Cette utilisateur n\'est pas dans un salon vocal.');
        if (tomute.user.bot) return message.channel.send("Impossible d'envoyer un bot en prison !");
        if (tomute.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous envoyer en prison vous-même");
        member.setVoiceChannel(null);
        
        let reason = args.slice(1).join(' ');
            if (!reason) reason = "Tu as commis une infraction, un modérateur t'a donc kické du salon vocal";

        const logchan = message.guild.channels.cache.find(c => ["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name))
            setTimeout(function() {
                if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logchan) {
                    message.guild.channels.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : ${error}`));
                }
            }, 2000);

        logchan.send({
            embed: {
              color: '#fc0703',
              author: {
                name: tomute.user.tag,
                icon_url: "https://cdn.discordapp.com/avatars/" + tomute.user.id + "/" + tomute.user.avatar + ".png"
              },
              title: "Kick Vocal",
              description: "Un utilisateur a été kické d'un salon vocal",
              thumbnail: {
                url: "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png",
              },
              fields: [{
                name: "Action",
                value: `Kick Vocal`,
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
                name: "Kické par",
                value: `${member.author.tag}`,
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
                icon_url: client.avatarURL,
                text: "© BMO"
              }
            }
        })
    }

    command.options = {
      name: ["mute"],
      enable: true
    };
  
    return command;
}