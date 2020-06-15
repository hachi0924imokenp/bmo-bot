exports.run = async (client, message, args) => {
if (message.author.id === "231956829159161856") {
    try {
      let toSay = "messageToSend"
      this.client.guilds.map((guild) => {
        let found = 0
        guild.channels.map((c) => {
          if (found === 0) {
            if (c.type === "text") {
              if (c.permissionsFor(this.client.user).has("VIEW_CHANNEL") === true) {
                if (c.permissionsFor(this.client.user).has("SEND_MESSAGES") === true) {
                  c.send(toSay);
                  found = 1;
                }
              }
            }
          }
        });
      });
    }
    catch (err) {
      console.log("Je ne peux pas envoyer de messages sur : (few) guild(s)!");
    }
  } else {
    message.send("Tu ne peux pas faire ça !")
   }
 }
