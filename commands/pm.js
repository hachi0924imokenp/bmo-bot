module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function command(message, args){
    message.delete(message.author);
    if (!message.member.roles.cache.some(r => ["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name))) return message.channel.send(`Désolé <@` + message.author.id + `>, vous n'avez pas la permission à l'utilistion nécessaire de cette commande.`);
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[2]));
    if (!member) return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");
    if(member.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous avertir vous-même");
    if (member.roles.cache.some(r => ["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name))) return message.channel.send("Impossible d'avertir un modérateur !");
    if(member.id === client.user.id) return message.channel.send("Hahaha, bien essayer mais je ne peux pas m\'avertir moi même !");
    if (member.user.bot) return message.channel.send("Impossible d'avertir un bot !");
    let reason = args.slice(3).join(' ');
    if (!reason) reason = "Attention ! Tu as eu un comportement incorrecte, si cela se reproduit tu seras sanctionné !";
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[2]);
    client.users.cache.get(target);
    message.author.send(`DM Envoyé à ${member.user.tag} !`).catch(() => message.channel.send(`DM Envoyé à ${member.user.tag} !`));
    target.send(`MODO ${message.author.tag} ===> ${reason}`).catch(() => message.reply("Je n'ai pas plus envoyer de DM à votre utilisateur !"));
  }

  command.options = {
    name: ["pm"],
    enable: true
  };

  return command;
}
