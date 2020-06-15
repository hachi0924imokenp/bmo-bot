module.exports = (client) => {
  return (message) => {
    // Ignore les bots
    if (message.author.bot) return;

    // Ignore les messages ne commençant pas par le préfix (dans config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    
    // Notre définition d'argument / nom de commande standard
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Récupère les données dela commande du client.commands Enmap
    const cmd = client.commands.get(command);
  
    // Si la commande n'existe pas, il ignore et envoie un message
    if (!cmd) {
      message.channel.send("Commande introuvable, s'il vous plait utiliser b!help pour la liste des commandes !")
      return false;
  }
    // Ignorer les DM /!\
    if(message.channel.type ==="dm"||message.channel.type==="group") {
    message.channel.send("Je ne suis pas fait pour fonctionner en DM/Groupes")
    return false;

}
    
    // Démarre la commande
    cmd.run(client, message, args);
  }
}
