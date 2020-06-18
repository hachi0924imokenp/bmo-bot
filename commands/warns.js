const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./modules/warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission nécessaire à l'utilisation de cette commande.");
  if(!wUser) return message.reply("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  let warnlevel = warns[wUser.id].warns;
  message.reply(`<@${wUser.id}> a un total de : ${warnlevel} warns.`);

}