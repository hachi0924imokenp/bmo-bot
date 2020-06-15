exports.run = async (client, message, args) => {
    message.delete();
    
    if(!message.member.roles.cache.some(r=>["🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé`+"<@" + message.author.id + `>, vous n'avez pas la permission à l'utilistion nécessaire de cette commande.`);

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member)
        return message.channel.send(`S\'il vous plaît <@` + message.author.id + `>, merci de mentionner un membre valide sur ce serveur`);

    if(!member.bannable)
        return message.channel.send("Je ne ne peux pas bannir cette utilisateur, Ais-je la permissions nécessaire ? Suis-je assez haut ?");

    
     let logchannel = message.guild.channels.cache.find("𝐦𝐨𝐝-𝐥𝐨𝐠𝐬");
    
     let reason = args.slice(1).join(' ');
        if(!reason) reason = "Tu as commis une infraction, un modérateur t'a donc bannis";
    
    const banned = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
    client.users.cache.get(banned);
    banned.send(`Tu as été bannis par ${message.author.tag} ===> ${reason}`);
    
    await member.ban(reason)
        .catch(error => message.channel.send(`Désolé, je ne peux pas bannir cette utilisateur à cause de : ${error}`));
    message.channel.send(`${member.user.tag} a été bannis par ${message.author.tag}`);

  const logs = message.guild.channel.find.cache("𝐦𝐨𝐝-𝐥𝐨𝐠𝐬");
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.channel.create('𝐦𝐨𝐝-𝐥𝐨𝐠𝐬').catch(error => message.channel.send(`Une erreur s'est produite durant la création du salon \"𝐦𝐨𝐝-𝐥𝐨𝐠𝐬\" : ${error}`));
  }
    
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
    console.log('Le salon des logs n\'existe pas, et j\'ai essayer de le crée mais je manque de permissions !')
  }
}
