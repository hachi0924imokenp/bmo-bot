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
  
    // Si la commande n'existe pas, il ignore et ne dis rien
    if (!cmd) return;
    
    // Ignorer les DM /!\
    if(message.channel.type==="dm") {
    message.channel.send("Impossible d'exécuter une commande en DM ! :BMOuh:")
    return false;
  }
  
    // Démarre la commande
    cmd.run(client, message, args);
  }
};
