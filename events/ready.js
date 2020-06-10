module.exports = (client) => {
  return () => {
    console.log(`BMO est prêt à fonctionné !`);
    client.user.setActivity(`b!help`, {type: "PLAYING"});
  }
}
