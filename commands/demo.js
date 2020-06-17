export.run = (client, message, args) => {

    if(!message.author.id !== 251455597738721280) {
        message.channel.send("Vous n'êtes pas mon créateur !");
    } // Si cette personne n'a pas l'user id : 251455597738721280 il va envoyer un message et ne pas éxecuter la commande

}