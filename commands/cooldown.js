module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

     

  async function command(message, args){
        const messageArray = message.content.split(' ');
        const arg = messageArray.slice(1);
           if (!message.member.roles.cache.some(r => [config.permissions.owner, config.permissions.admins, config.permissions.mods].includes(r.name))) 
              return message.channel.send(`Désolé` + "<@" + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilistion de cette commande.`);
           
           if (!arg[0]) {
                 message.channel.setRateLimitPerUser("0")
                 message.channel.send(`<a:yes:846360598623027261> Slowmode retiré !`)
           } else if (arg[0] === "5s") {
                 message.channel.setRateLimitPerUser(5);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 5s`)
           } else if (arg[0] === "10s") {
                 message.channel.setRateLimitPerUser(10);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 10s`)
           } else if (arg[0] === "15s") {
                 message.channel.setRateLimitPerUser(15);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 15s`)
           } else if (arg[0] === "30s") {
                 message.channel.setRateLimitPerUser(30);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 30s`)
           } else if (arg[0] === "1m") {
                 message.channel.setRateLimitPerUser(60);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 1m`)
           } else if (arg[0] === "2m") {
                 message.channel.setRateLimitPerUser(120);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 2m`)
           } else if (arg[0] === "5m") {
                 message.channel.setRateLimitPerUser(300);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 5m`)
           } else if (arg[0] === "10m") {
                 message.channel.setRateLimitPerUser(600);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 10m`)
           } else if (arg[0] === "15m") {
                 message.channel.setRateLimitPerUser(900);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 15m`)
           } else if (arg[0] === "30m") {
                 message.channel.setRateLimitPerUser(1800);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 30m`)
           } else if (arg[0] === "1h") {
                 message.channel.setRateLimitPerUser(3600);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 1h`)
           } else if (arg[0] === "2h") {
                 message.channel.setRateLimitPerUser(7200);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 2h`)
           } else if (arg[0] === "6h") {
                 message.channel.setRateLimitPerUser(21600);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : 6h`)
           } else if (isNaN(arg[0])) {
                 message.channel.send("Merci d'entrer une valeur sous la forme suivante : \n;cooldown <valeur en secondes>\n;cooldown 30m")
           } else if (arg[0] > 21600) {
                 message.channel.send("Merci d'entrer un nombre entre 0 et 21600 (exprimer en secondes)")
           } else {
                 message.channel.setRateLimitPerUser(arg[0]);
                 message.channel.send(`<a:yes:846360598623027261> Slowmode régler sur : ${arg[0]} secondes`)
           }
   }

    command.options = {
      name: ["cooldown", "slowmode"],
      enable: true
    };
  
    return command;
}
