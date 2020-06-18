module.exports = (client) => {
  return () => {
    console.log(`-----------------------\nBMO est prêt à fonctionné !`);
    client.user.setActivity(`ma série favorite !`, {type: "LISTENING"});
  }
}
