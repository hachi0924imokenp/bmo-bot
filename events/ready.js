module.exports = (client) => {
  return () => {
    console.log(`-----------------------\nBMO est prêt à fonctionné !`);
    
    const activities_list = [
      "b!help", 
      "ma série favorite !",
      "mon créateur !",
      "The Last of Us Part II"
      ]; 
    setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
      client.user.setActivity(activities_list[index], {type: "LISTENING"}); 
    }, 100000); 
  }
}
