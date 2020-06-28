module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function event(message){

    if (message.author.bot) return;

    const swearWords = ["Fuck", "fuck"];
    if(swearWords.map(n => message.content.includes(n)).filter(n => n !== false)[0]){
      message.channel.send({embed: {
          color: 3447003,
          author: {
            name: message.author.username,
            icon_url: message.author.avatarURL
        },
          title: "Insultron",
          description: "Un mot suceptible d'être innaproprié a été détecter, merci de choisir une action parmis les possibilitées suivante :\n \n \n \n \n \n",
            fields: [{
              name: "Pseudo :",
              value: `${message.author.username}`
            },
            {
              name: "Mot suceptible d'être innaproprié :",
              value: `${message.content.substr(0)}`
            },
            {
              name: "Mot suceptible d'être innaproprié :",
              value: `${message.content.substr(0)}`
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© BMO"
          }
      }
     })
    }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commands = getFiles(__dirname+"/../commands").filter(f => f.endsWith(".js"));
   
    if (message.channel.type ==="dm" || message.channel.type==="group")
      return message.channel.send("Je ne suis pas fait pour fonctionner en DM/Groupes");

    for(let i=0; i<commands.length; i++){
      let command = require(commands[i])(globalVariables);
      for(let n=0; n<command.options.name.length; n++){
        if(message.content.toLowerCase().startsWith(prefix+command.options.name[n].toLowerCase()) && command.options.enable) return command(message, message.content.slice(prefix.length).trim().split(/ +/g));
      }
    }
  }

  event.listener = "message";

  return event;
}
