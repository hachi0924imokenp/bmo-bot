exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé <@` + message.author.id + `>, vous n'avez pas la permission à l'utilistion nécessaire de cette commande.`);

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member)
        return message.channel.send(`S\'il vous plaît <@` + message.author.id + `>, merci de mentionner un membre valide sur ce serveur`);

     const muteRole = message.guild.roles.cache.find(r=>["🏝️ No Man's Land"].includes(r.name);
     member.addRole(muteRole);
     
     const MUTE_TIME = 60 * 1000;
     setTimeout(() => {
        member.removeRole(muteRole);
    }, MUTE_TIME);
    
     message.channel.send(`Forcechockes ${member} for 60 seconds.`);
}
