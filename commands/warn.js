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
  
    let warnEmbed = new Discord.MessageEmbed()
    .setDescription("Warn !")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField(
        { name: 'Utilisateur Warn', value: `<@${wUser.id}>` },
        { name:'Warn dans le salon', value: message.channel },
        { name: 'Nombre de warns', value: warns[wUser.id].warns },
        { name:"Raison", reason },
    )
  
    let warnchannel = message.guild.channels.cache.find(c=>["𝐦𝐨𝐝-𝐥𝐨𝐠𝐬"].includes(c.name));
    if(!warnchannel) return message.reply("Je ne peux pas trouver le salon \'𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\'");
  
    warnchannel.send(warnEmbed);
  
    if(warns[wUser.id].warns == 4){
    message.guild.roles.cache.find(r => ["🏝️ No Man's Land"].includes(r.name));
    if(!muterole) return message.reply("Merci de crée un rôle nommée \'🏝️ No Man's Land\'");
  
      let mutetime = "5m";
      await(wUser.addRole(muterole.id));
      message.channel.send(`<@${wUser.id}> a été muté !`);
  
      setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.reply(`<@${wUser.id}> a été unmute !`)
      }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 10){
      message.guild.member(wUser).ban(reason);
      message.reply(`<@${wUser.id}> a été bannis`)
    }  
}