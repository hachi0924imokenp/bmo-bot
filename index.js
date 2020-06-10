const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json");
// Nous devons également nous assurer que nous attachons la configuration au CLIENT pour qu'elle soit accessible partout!
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event(client));
  });
});

client.commands = new Enmap();

fs.readdir("./Commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./Commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Tentative de chargement de la commande : ${commandName} \n ------------------------`);
    client.commands.set(commandName, props);
  });
});

// Important au démarrage du bot!
client.login(process.env.BOT_TOKEN);
message.js
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
  
    // Démarre la commande
    cmd.run(client, message, args);
  }
};
