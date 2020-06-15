exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some(r=>["🛡️ P'tit Modo Test 🛡️", "🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé <@` + message.author.id + `>, vous n'avez pas la permission à l'utilistion nécessaire de cette commande.`);
    
    const deleteCount = parseInt(args[0], 10);


    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.channel.send("Merci d'entrer un nombre entre 1 et 100");
    
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Je ne peux pas supprimer les messages à cause d'une erreur : ${error}`));
    message.channel.send(`${deleteCount} messages ont été supprimer dans ce salon`)
}
