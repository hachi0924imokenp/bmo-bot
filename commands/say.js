exports.run = async (client, message, args) => {

    if(!message.member.roles.cache.some(r=>["🛡️ P'tit Modo Test 🛡️", "🐹 Modo T'chat Test 🐹", "🛡️ P'tit Modo 🛡️", "🌟 Modo T'chat  🌟", "👑 Fondateurs 👑", "👑 Fondateur Principal 👑"].includes(r.name)))
        return message.channel.send(`Désolé <@` + message.author.id + `>, vous n'avez pas la permission à l'utilistion nécessaire de cette commande.`);
    
    
    const target = args[0]
    let text = args.slice(2).join(' ');
        if(!reason) reason = "I show u";


    client.channels.get(target).send(`MODO {message.author.username} : ${text} `)
}
