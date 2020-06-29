module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function event(message){

    if (message.author.bot) return;

    const swearWords = ["Fuck", "fuck"];
    if(swearWords.map(n => message.content.includes(n)).filter(n => n !== false)[0]){
      const mod = message.member.roles.cache.some(r => ["🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name));
      const filter = (reaction, user) => [mod].includes(reaction.name) && user.id === message.author.id;
      
      message.channel.send({embed: {
          color: 3447003,
          author: {
            name: message.author.username,
            icon_url: "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png"
        },
          title: "Insultron",
          description: "Un mot suceptible d'être innaproprié a été détecter, merci de choisir une action parmis les possibilitées suivante :\n \n \n \n \n \n",
            fields: [{
              name: "Pseudo :",
              value: `${message.author.username}`
            },
            {
              name: "ID :",
              value: `${message.author.id}`
            },
            {
              name: "Mention :",
              value: `<@${message.author.id}>`
            },
            {
              name: "Dans le salon :",
              value: `<#${message.channel.id}>`
            },
            {
              name: "ID du salon :",
              value: `${message.channel.id}`
            },
            {
              name: "Message suceptible d'être innaproprié :",
              value: `${message.content.substr(0)}`
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© BMO"
          }
      }
     }).then(async message => {
      message.react("🛡️")
      message.react("🔇")
      message.react("⚔️")
      message.react("⛔")
      message.react("🗑️")
      
      message.awaitReaction(filter, {
        max: 1,
        time: 30000,
        errors: ['time']
      }).then(collected => {

        const reaction = collected.first();
        switch (reaction.emoji.name) {
          case '🛡️':
          const resultembed1 = new Discord.MessageEmbed()
            .setTitle('Insultron')
            .setColor('#00ff0d')
            .setDescription(`✅ Sanction "PM" appliqué par : <${reaction.user.id}> à`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();

            message.edit(resultembed1);
            message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));         
            break;

          case '🔇':
          const resultembed2 = new Discord.MessageEmbed()
            .setTitle('Insultron')
            .setColor('#00ff0d')
            .setDescription(`✅ Sanction "Mute" appliqué par : <@${reaction.user.id}> (60m) à`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();

            message.edit(resultembed2);
            message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));
            break;
          
          case '⚔️':
          const resultembed3 = new Discord.MessageEmbed()
            .setTitle('Insultron')
            .setColor('#00ff0d')
            .setDescription(`✅ Sanction "Kick" appliqué par : <@${reaction.user.id}> à`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();

            message.edit(resultembed3);
            message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));
            break;

          case '⛔':
          const resultembed4 = new Discord.MessageEmbed()
            .setTitle('Insultron')
            .setColor('#00ff0d')
            .setDescription(`✅ Sanction "Ban" appliqué par : <@${reaction.user.id}> à`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();
          
            message.edit(resultembed4);
            message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));
            break;
          
          case '🗑️':
            const resultembed5 = new Discord.MessageEmbed()
            .setTitle('Insultron')
            .setColor('#ff0000')
            .setDescription(`🗑️ Sanction ignoré par : <@${reaction.user.id}>`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();

            message.edit(resultembed5);
            message.reactions.removeAll().catch(error => console.error('Impossible de supprimer les réactions : ', error));
            break;
          }

      }).catch(collected => {
        return message.channel.send("Certaines actions n'ont pas été effectué !")
      })
    });
  }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commands = getFiles(__dirname+"/../commands").filter(f => f.endsWith(".js"));
   
    if (message.channel.type ==="dm" || message.channel.type==="group")
      return message.channel.send("Je ne suis pas fait pour fonctionner en DM/Groupes");

    for(let i=0; i<commands.length; i++){
      let command = require(commands[i])(globalVariables);
      for(let n=0; n<command.options.name.length; n++){
        if(message.content.toLowerCase().startsWith(prefix+command.options.name[n].toLowerCase()) && command.options.enable) return command(message, message.content.slice(prefix.length).trim().split(/ +/g));
      }
    }
  }

  event.listener = "message";

  return event;
}
