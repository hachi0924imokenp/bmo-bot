exports.run = (client, message, args) => {

  const retour = new Discord.RichEmbed()
    .setTitle("Shutdown")
    .setURL("https://github.com/Cleaner-Discord/bmo-bot/")
    .setAuthor("BMO", )
    .setColor("#2eff46")
    .setDescription("Le bot va se déconnecter.")
    .setThumbnail("https://cdn.discordapp.com/attachments/556499322435272709/722540236076351538/0a0054900dc4827350258c01ffc08470.png")
    .addField("Redémarrer par", `${message.author.id}`, true)
    .addBlankField(true)
    .addField("","")
    .setFooter(`Crée par ありがと ございます#9878`, "https://cdn.discordapp.com/avatars/251455597738721280/9fcab661f0a8391d5ab53453370fe1fe.png")
    .setTimestamp()

message.delete(message.author)
    if(message.author.id == "251455597738721280"){
        message.channel.send({retour});
        console.log("Exiting Success")
        process.exit(1);
    } else {
        message.channel.sendMessage({embed: {
          title: "Erreur:",
          color: 0xFFFFFF,
          description: ` :no_entry_sign: Vous n'avez pas la permission ${message.author} :no_entry_sign: `,
          footer: {
            text: "© BMO"
         }
     }})
  }
}