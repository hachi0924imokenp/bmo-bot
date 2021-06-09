module.exports = (globalVariables) => {
  Object.keys(globalVariables).map(variable => {
    global[variable] = globalVariables[variable];
  });

      async function command(message, args){
          var con = mysql.createConnection({
              host: config.mysql.mysql_host,
              port: config.mysql.mysql_port,
              user: config.mysql.mysql_user,
              password: config.mysql.mysql_password
          });

	  if (!message.member.roles.cache.some(r => [config.permissions.owner, config.permissions.admins, config.permissions.mods].includes(r.name))) 
            return message.channel.send(`Désolé` + "<@" + message.author.id + `>, vous n'avez pas la permission nécessaire à l'utilistion de cette commande.`);

          let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

          if (!member)
            return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");

          if(member.id === client.user.id)
            return message.channel.send("<:objection:846329100683575296> bien essayé mais je ne peux pas me warn moi même !");

          if (member.user.bot)
            return message.channel.send("<:objection:846329100683575296> Impossible de warn un bot !");

          if(member.id === message.author.id)
            return message.channel.send("<:objection:846329100683575296> Vous ne pouvez pas vous warn vous-même");

          if (member.roles.cache.some(r => [config.permissions.owner, config.permissions.admin, config.permissions.mod].includes(r.name))) 
            return message.channel.send("<:objection:846329100683575296> Impossible de warn un modérateur !");


	  let reason = args.slice(2).join(' ');
	    if(!reason) reason = "<a:slam1:846376062605983755><a:slam2:846376102347538462> Tu as commis une infraction, un modérateur t\\'a donc warn";

	  con.connect(function(err) {
             if (err) throw err;
             console.log("Connected!");
          });

          con.query(`USE bot`);
          con.query(`SELECT * FROM \`warn\``);
          con.query(`INSERT INTO warn (\`CASE\`, \`USER\`, \`USER ID\`, \`MOD\`, \`MOD ID\`, \`REASON\`) VALUES ('0', '${member.user.username}', '${member.id}', '${message.author.username}', '${message.author.id}', '${reason}')`);
          con.query(`INSERT INTO moderation (\`CASE\`, \`TYPE\`, \`USER\`, \`USER ID\`, \`MOD\`, \`MOD ID\`, \`REASON\`) VALUES ('0', 'WARN', '${member.id}', '${member.user.username}', '${message.author.username}', '${message.author.id}', '${reason}')`);
	  message.channel.send(`<@${member.id}> a été warn !`)
	  member.send('Tu as été warn par ${message.author.id} => $reason');
      }

    command.options = {
      name: ["warn"],
      enable: true
    };

    return command;
}
