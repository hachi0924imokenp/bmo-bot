exports.run = async (client, message, args) => {
const deleteCount = parseInt[0], 10);


    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.channel.send("Merci d'entrer un nombre entre 1 et 100");
    
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Je ne peux pas supprimer les messages à cause d'une erreur : ${error}`));
    message.channel.send(`${delete.count} on été supprimer dans ce salon`)
}
