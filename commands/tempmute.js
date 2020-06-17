const ms = require("ms");
exports.run = async (client, message, args) => {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!tomute) return message.channel.send("Merci de mentionner un utilisateur sous la forme suivante:\n\nMention : ``@user#1234``\nDiscord ID : ``251455597738721280``");

  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Impossible d'envoyer cette utilisateur en prison !");
  
  let muterole =  message.guild.roles.cache.find(r => ["🏝️ No Man's Land"].includes(r.name));
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "🏝️ No Man's Land",
        color: "#ffd9000",
        permissions:[]
      })

      message.guild.channels.forEach(async (channel, id ) =>{
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);

    }
  }

  let mutetime = args[1];
  if(!mutetime) return message.reply("Vous n'avez pas spécifié le temps !");
  
  let reason = args.slice(2).join(' ');
        if(!reason) reason = "Vous avez commis une infraction, un modérateurs vous a donc envoyé(e) en prison";
  
  await(tomute.roles.add(muterole.id));
  
  const getDefaultChannel = (guild) => {
    if(guild.channels.has(guild.id))
      return guild.channels.get(guild.id)
  
    const generalChannel = guild.channels.find(channel => channel.name === "general");
    if (generalChannel)
      return generalChannel;

    return guild.channels
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
     .sort((a, b) => a.position - b.position ||
       Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
     .first();
  }

  const channel = getDefaultChannel(tomute.guild);
    channel.send(`${tomute.tag} a été mis en prison par ${message.author.tag}`);
  
  client.users.cache.get(tomute);
    tomute.send(`${message.author.tag} t'envoie en prison ${ms(ms(mutetime))} ===> ${reason}`)
  
  
  setTimeout(function(){
    tomute.roles.remove(muterole.id);
  }, ms(mutetime));
}
