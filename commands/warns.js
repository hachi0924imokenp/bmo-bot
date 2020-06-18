const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./modules/warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  
  
  if(!message.member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
  return message.channel.send(`Désolé`+"<@" + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilistion de cette commande.`);

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> a ${warnlevel} warns.`);

}
