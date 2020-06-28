module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  async function command(message, args){
    message.delete(message.author);
    if (!message.author.id !== ownerID) {
      message.channel.send("Vous n'êtes pas mon créateur !");
    }
    message.channel.send("Okay :ok_hand:");
  }

  command.options = {
    name: ["demo"],
    enable: true
  };

  return command;
}
