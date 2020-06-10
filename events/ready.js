module.exports = (client) => {
  return () => {
    client.logger.log(`BMO est prêt à fonctionné !`);
    client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
  }
}
