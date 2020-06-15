exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé <@` + message.author.id + `>, vous n'avez pas la permission à l'utilistion nécessaire de cette commande.`);

    let tomute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!tomute)
        return message.channel.send(`S\'il vous plaît <@` + message.author.id + `>, merci de mentionner un membre valide sur ce serveur`);

     const muteRole = message.guild.roles.cache.find(r=>["🏝️ No Man's Land"].includes(r.name));
     if(!muteRole)
         return message.channel.send("Impossible de trouver le rôle 🏝️ No Man\'s Land");
    
      if(tomute.roles.cache.has(muteRole)) return message.channel.send("Cette utilisateur est déjà en prison !.");
      tomute.roles.add(muteRole);
     
     const MUTE_TIME = 60 * 1000;
     setTimeout(() => {
        tomute.roles.remove(muteRole);
    }, MUTE_TIME);
    
     message.channel.send(`${tomute.username} a été mis en prison ${message.author.username}`);
     client.users.cache.get(tomute);
     tomute.send(`Vous avez été mis en prison par ${message.author.tag} ===> ${MUTE_TIME / 60}`)
     return;
}
