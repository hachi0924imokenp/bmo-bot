exports.run = (client, message, args) => {
moment.locale("fr");
  var temps = moment(message.createdTimestamp).format('DD/MM/YYYY \n à HH:mm:ss');
  console.log(temps)
  if(message.author.id === "251455597738721280"){
  message.delete(message.author);
  var msg = message.content.substr(9);
  var raison;
  var note;
  if (msg.indexOf("raison=") !== -1) {
    var prevMessage = msg.substring(0, msg.indexOf("raison="));
    var msg = msg.substring(msg.indexOf("raison=") + 7);
    let index = msg.indexOf("`");
    raison = msg.substring(0, index);
    msg = prevMessage + msg.substring(index + 1);
    if(raison === null){
      raison = "Raison inconnue";
    }
  } else {
    raison = "Raison inconnue";
  } if (msg.indexOf("note=") !== -1) {
      var prevMessage = msg.substring(0, msg.indexOf("note="));
      var msg = msg.substring(msg.indexOf("note=") + 5);
      let index = msg.indexOf("`");
      note = msg.substring(0, index);
      msg = prevMessage + msg.substring(index + 1);
      if(note === null){
        note = "Aucune note";
      }
  } else {
      note = "Aucune note";
  }
  console.log("Arrêt en cours...")
   message.channel.send({embed});
      title: "Évenement",
      color: 1752220,
      description: `**Évenement** : Restart  \n\n**Le :** ${temps}\n\n**Par :** ${message.author}\n\n**Raison :** ${raison}\n **Notes :** ${note}`,
      footer: {
        text:  "BMO" 
      }}})
  setTimeout(function() { process.exit(1); }, 1000);
  } else {message.channel.send({embed: {
      title: "Erreur:",
      color: 0xFFFFFF,
      description: `:no_entry_sign: Vous n'avez pas la permission ${message.author} :no_entry_sign:`,
}})}}
