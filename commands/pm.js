exports.run = async (client, message, args) => {
    message.delete()
    
    if(!message.member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé <@` + message.author.id + `>, vous n'avez pas la permission à l'utilistion nécessaire de cette commande.`);

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member)
        return message.channel.send(`S\'il vous plaît <@` + message.author.id + `>, merci de mentionner un membre valide sur ce serveur`).then(message => {
         message.delete({ timeout: 10000})
    }).catch(error => message.send(`Désolé ${message.author}, L'erreur suivante s'est produite durant l'exécution : ${error}`));
        
     let reason = args.slice(1).join(' ');
        if(!reason) reason = "Attention ! Tu as eu un comportement incorrecte, si cela se reproduit tu seras sanctionné !";

    const target = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
    client.users.cache.get(target);
    target.send(`MODO ${message.author.tag} ===> ${reason}`);
    message.author.send("PM Envoyé !")
}
