module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function event(message){

    if (message.author.bot) return;

    const swearWords = ["Fuck", "fuck"];
    const insultron = new Discord.MessageEmbed()
          .setTitle('Insultron')
          .setColor("#ff0a0a")
          .setThumbnail("https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png")
          .setAuthor(`${message.author.username}`, "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png")
          .setDescription('Un mot suceptible d\'être innaproprié a été détecter')
          .addFields(
            { name: 'Action possibles', value: '\n\n🗑️ Détruire le message \n🛡️ Avertir l\'utilisateur en DM \n🔇 Mute (60 minutes) \n⚔️ Kick \n⛔ Bannir Définitivement \n❌ Ignorer' },
            { name: '\u200B', value: '-----------------------------' },
            { name: '\u200B', value: '__**Informations**__' },
            { name: 'Pseudo :', value: message.author.username },
            { name: 'ID de l\'utilisateur :', value: message.author.id },
            { name: 'Discriminateur :', value: '#' + message.author.discriminator },
            { name: 'Mention :', value:`<@${message.author.id}>` },
            { name: 'Dans le salon :', value:`<#${message.channel.id}>` },
            { name: 'ID du salon :', value: `${message.channel.id}` },
            { name: 'Message suceptible d\'être innaproprié :', value: `${message.content.substr(0)}` },
            { name: '\u200B', value: `[Cliquer ici pour afficher le salon](https://google.fr 'Salon')` },
          )
          .setTimestamp()
          .setFooter('© BMO', "https://cdn.discordapp.com/avatars/" +client.user.id + "/" + client.user.avatar + ".png");
            
      if(swearWords.map(n => message.content.includes(n)).filter(n => n !== false)[0]){
        if (message.member.roles.cache.some(r => ["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name))) return;
      
        const cmd = message.guild.channels.cache.find(c => ["mod-cmds"].includes(c.name))
          if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !cmd) {
            message.guild.channels.create('mod-cmds').then(async message => {
            const sucess = new Discord.MessageEmbed()
            .setTitle('Succès')
            .setColor(')#81ff75')
            .setDescription(`✅ Le salon \`\`\`mod-cmds\`\`\` a été crée avec succès`)
            .setFooter('© BMO', client.user.avatarURL)
            .setTimestamp();
            message.channel.send('Le salon \'mod-cmds\' a été crée avec succès !')
          })
        } 
          
          if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !cmd) {
            const error = new Discord.MessageEmbed()
              .setTitle('Erreur')
              .setColor('#FF0000')
              .setDescription(`👨‍🔧 Une erreur s'est produite lors de la création du salon "mod-cmds"`)
              .addField('Erreur :', '\`MISSING PERMISSION \'MANAGE_CHANNELS\'\`', false)
              .setFooter('© BMO', client.user.avatarURL)
              .setTimestamp();
              
              message.channel.send(error) 
              return;
          }   

            cmd.send(insultron).then(async message => {
              message.react("🗑️")
              message.react("🛡️")
              message.react("🔇")
              message.react("⚔️")
              message.react("⛔")
      
            const collector = message.createReactionCollector((reaction, user, client) => 
                user.id === (!client.id) &&
                reaction.emoji.name === "🗑️" ||
                reaction.emoji.name === "🛡️" ||
                reaction.emoji.name === "🔇" ||
                reaction.emoji.name === "⚔️" ||
                reaction.emoji.name === "⛔" ||
                reaction.emoji.name === "❌"
              ).once("collect", reaction => {
                const chosen = reaction.emoji.name;
                if(chosen === "🗑️"){
                  message.edit("test1")
                }
                else if(chosen === "🛡️"){
                  message.edit("test2")
                }
                else if(chosen === "🔇"){
                  message.edit("test3")
                }
                else if(chosen === "⚔️"){
                  message.edit("test4")
                }
                else if(chosen === "⛔"){
                  message.edit("test5")
                } else {
                  message.edit("test6")
                }
                collector.stop();
              })
            })
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
