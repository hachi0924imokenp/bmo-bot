module.exports = (client) => {
  return () => {
    console.log(`-----------------------\nBMO est prêt à fonctionné !`);
    client.user.setActivity(`my master !`, {type: "WATCHING"});
  }
}
