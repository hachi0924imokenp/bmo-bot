module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

  function event(){
    console.log(`-----------------------\nOMO est prêt à fonctionné !`);
    const activities_list = [
      "b!help",
      "mon créateur !",
      "sur un certains serveur secret !",
    ];
    setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
      client.user.setActivity(activities_list[index], {type: "LISTENING"});
    }, 60000);
  }

  event.listener = "ready";

  return event;
}
