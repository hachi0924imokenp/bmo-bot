exports.run = (client, message, args) => {
  message.delete();
  
  if(message.author.id !== "251455597738721280") { 
    message.channel.send("Vous n'avez pas la permission nécessaire <:BMOsad:699766556879618078>")
    return;
  }
  
  if(!args || args.length < 1) return message.reply("Vous devez donner le nom d'une commande à recharger.");
  const commandName = args[0];
  if(!client.commands.has(commandName)) {
    return message.reply("Cette commande n'existe pas");
  }
  
  delete require.cache[require.resolve(`./${commandName}.js`)];
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.reply(`La commande ${commandName} a bien été recharger.`);
};
