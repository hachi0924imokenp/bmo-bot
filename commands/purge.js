module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

      async function command(message, args){
     
     }
  
    command.options = {
      name: ["clear", "purge"],
      enable: true
    };
  
    return command;
}
