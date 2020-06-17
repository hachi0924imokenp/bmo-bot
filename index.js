const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const ms = require("ms")

const cliemsnt = new Discord.Client();
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

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Tentative de chargement de la commande : ${commandName}`);
    client.commands.set(commandName, props);
  });
});

// Important au démarrage du bot!
client.login(process.env.BOT_TOKEN);
