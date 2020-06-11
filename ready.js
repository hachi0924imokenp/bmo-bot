module.exports = (client) => {
  return () => {
    console.log(`-----------------------\nBMO est prêt à fonctionné !`);
    client.user.setActivity(`b!help`, {type: "PLAYING"});
  }
}
