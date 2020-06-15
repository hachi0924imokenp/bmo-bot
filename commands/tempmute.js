const ms = require("ms");

exports.run = async (client, message, args) => {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Je ne peux pas trouver cette utilisateur.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Impossible de mute cette utilisateur !");
  
  let muterole =  message.guild.roles.cache.find(r => ["🏝️ No Man's Land"].includes(r.name));
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "🏝️ No Man's Land",
        color: "#000000",
        permissions:[]
      })

      message.guild.channels.forEach(async (channel, id) => {
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
  message.channel.send(`<@${tomute.id}> a été mis en prison par ${message.author.tag}`);
  client.users.cache.get(tomute);
    tomute.send(`${message.author.tag} t'envoie en prison ===> ${ms(ms(mutetime))} ${reason}`)
  
  
  setTimeout(function(){
    tomute.roles.remove(muterole.id);
    message.channel.send(`<@${tomute.id}> a purgé sa peine de prison !`);
  }, ms(mutetime));
}
