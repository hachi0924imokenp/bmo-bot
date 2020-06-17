exports.run = async (client, message, args) => {
    
    if(!message.member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé <@` + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilisation de cette commande.`);

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member)
        return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``").then(message => {
        message.delete({ timeout: 10000})
    }).catch(error => message.send(`Désolé ${message.author}, L'erreur suivante s'est produite durant l'exécution : ${error}`));
        
    if (member.roles.cache.some(r=>["🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send("Impossible d'avertir un modérateur !");
   
    if (member.user.bot)
        return message.channel.send("Impossible d'avertir un bot !");
        
     let reason = args.slice(1).join(' ');
        if(!reason) reason = "Attention ! Tu as eu un comportement incorrecte, si cela se reproduit tu seras sanctionné !";

    const target = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);
    client.users.cache.get(target);
    message.author.send(`DM Envoyé à ${member.user.tag} !`).catch(() => message.channel.send(`DM Envoyé à ${member.user.tag} !`));
    target.send(`MODO ${message.author.tag} ===> ${reason}`).catch(() => message.reply("Je n'ai pas plus envoyer de DM à votre utilisateur !"));
}
