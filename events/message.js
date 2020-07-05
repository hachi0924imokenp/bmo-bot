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
          .setDescription('Un mot suceptible d\'être innaproprié a été détecter, vous pouvez effectuer une action en utilisant les réactions ci-dessous !')
          .addFields(
            { name: '__**Action possibles**__', value: '\n🗑️ Détruire le message \n🛡️ Avertir l\'utilisateur en DM \n🔇 Mute (60 minutes) \n⚔️ Kick \n⛔ Bannir Définitivement \n❌ Ignorer',  inline: true},
            { name: '\u200B', value: '\u200B',  inline: true},
            { name: '\u200B', value: '__**Informations**__ :' },
            { name: 'Pseudo :', value: message.author.username, inline: true },
            { name: 'ID de l\'utilisateur :', value: message.author.id, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Discriminateur :', value: '#' + message.author.discriminator, inline: true },
            { name: 'Mention :', value:`<@${message.author.id}>`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Dans le salon :', value:`<#${message.channel.id}>`, inline: true },
            { name: 'ID du salon :', value: `${message.channel.id}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Message suceptible d\'être innaproprié :', value: `**${message.content.substr(0)}**`, inline: true },
            { name: '\u200B', value: `[Cliquer ici pour afficher le salon](https://discord.com/channels/`+message.guild.id+`/`+message.channel.id+` 'Lien du salon')`},
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
            message.channel.send(sucess)
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
          const author = message.author.id
          const auth = message.author
          const content = message.content.substr(0);


          cmd.send(insultron).then(async message => {
              await message.react("🗑️");
              await message.react("🛡️");
              await message.react("🔇");
              await message.react("⚔️");
              await message.react("⛔");
              message.react("❌").then(() => {
              setTimeout(function(){
      
              const collector = message.createReactionCollector((reaction, user) => 
                 user.id !== message.author.id &&
                  reaction.emoji.name === "🗑️" ||
                  reaction.emoji.name === "🛡️" ||
                  reaction.emoji.name === "🔇" ||
                  reaction.emoji.name === "⚔️" ||
                  reaction.emoji.name === "⛔" ||
                  reaction.emoji.name === "❌"
                ).once("collect", reaction => {
                  const chosen = reaction.emoji.name;
                  if(chosen === "🗑️"){
                    const clear = new Discord.MessageEmbed()
                      .setTitle('Succès')
                      .setColor('#00FF00')
                      .setDescription(`✅ Le message de <@`+author+`> a été supprimé avec succès !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();
                    
                    const clearerr = new Discord.MessageEmbed()
                      .setTitle('Erreur')
                      .setColor('#FF0000')
                      .setDescription(`❌ Une erreur s'est produite pendant la tentaive de supression !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();

                    message.delete(auth)
                    message.edit(clear)
                    message.reactions.removeAll();
                  }
                  else if(chosen === "🛡️"){
                    const warn = new Discord.MessageEmbed()
                      .setTitle('Succès')
                      .setColor('#00FF00')
                      .setDescription(`✅ L'utilisateur <@`+author+`> a été avertis avec succès !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();
                    
                    const warnerr = new Discord.MessageEmbed()
                      .setTitle('Erreur')
                      .setColor('#FF0000')
                      .setDescription(`❌ Une erreur s'est produite pendant la tentaive d'envoie d'un avertissement' !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();
                    message.edit(warn)
                    message.reactions.removeAll();
                  }
                  else if(chosen === "🔇"){
                    const mute = new Discord.MessageEmbed()
                      .setTitle('Succès')
                      .setColor('#00FF00')
                      .setDescription(`✅ L'utilisateur <@`+author+`> a été envoyer en prison avec succès !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();
                  
                    const muteerr = new Discord.MessageEmbed()
                      .setTitle('Erreur')
                      .setColor('#FF0000')
                      .setDescription(`❌ Une erreur s'est produite pendant la tentaive d'envoie en prison' !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();

                    message.edit(mute)
                    message.reactions.removeAll();
                  }
                  else if(chosen === "⚔️"){                    
                    const kickmsg = new Discord.MessageEmbed()
                      .setTitle('Succès')
                      .setColor('#00FF00')
                      .setDescription(`✅ L'utilisateur <@`+author+`> a été kické avec succès !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();
                      
                    const kickerr = new Discord.MessageEmbed()
                      .setTitle('Erreur')
                      .setColor('#FF0000')
                      .setDescription(`❌ Une erreur s'est produite pendant la tentaive de kick !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();
                    
                    auth.kick("Kické")
                    message.edit(kickmsg)
                    message.reactions.removeAll();
                  }
                  else if(chosen === "⛔"){
                    const banmsg = new Discord.MessageEmbed()
                      .setTitle('Succès')
                      .setColor('#00FF00')
                      .setDescription(`✅ L'utilisateur <@`+author+`> a été bannus avec succès !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();

                    const banerr = new Discord.MessageEmbed()
                      .setTitle('Erreur')
                      .setColor('#FF0000')
                      .setDescription(`❌ Une erreur s'est produite pendant la tentaive de banissement !`)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();
                    
                    auth.ban("Banned")
                    message.edit(banmsg)
                    message.reactions.removeAll();
                  } else {
                    const stop = new Discord.MessageEmbed()
                      .setTitle('Ignorer')
                      .setColor('#FF0000')
                      .setDescription(`❌ Aucune action n'a été effectué !`)
                      .addField('Contenu du message :', `${content}`, true)
                      .setFooter('© BMO', client.user.avatarURL)
                      .setTimestamp();
                    
                    message.edit(stop)
                    message.reactions.removeAll();
                  }
                  collector.stop();
                })
              }, 3000)
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
