exports.run = (client, message, args) => {
const moment = require("moment");
 
message.delete(message.author)
    if(message.author.id == "251455597738721280"){
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
