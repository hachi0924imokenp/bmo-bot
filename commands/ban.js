exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(r=>["🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé`+"<@" + message.author.id + ">, vous n'avez pas la permission à l'utilistion nécessaire de cette commande.`);

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member)
        return message.channel.send(`S\'il vous plaît @{message.author.tag}, merci de mentionner un membre valide sur ce serveur`);

    if(!member.bannable)
        return message.channel.send("Je ne ne peux pas bannir cette utilisateur, Ais-je la permissions nécessaire ? Suis-je assez haut ?");

    let reason = args.slice(1).join(' ');
        if(!reason) reason = "Vous avez commis une infraction, un modérateur vous a donc bannis";
    
    const banned = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
    client.users.cache.get(banned);
    banned.send(`Vous avez été bannis par ${message.author.tag} ===> ${reason}`);
    
    await member.ban(reason)
        .catch(error => message.channel.send(`Désolé, je ne peux pas bannir cette utilisateur à cause de : ${error}`));
    message.channel.send(`${member.user.tag} a été bannis par ${message.author.tag}`);

}
