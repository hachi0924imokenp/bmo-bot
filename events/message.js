module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function event(message){

    const swearWords = ["Fuck", "Bitch"];
    if(swearWords.map(n => message.content.includes(n))) {
      message.channel.send("Don't use badwords !")
      return;
    }

    if (message.author.bot) return;
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
