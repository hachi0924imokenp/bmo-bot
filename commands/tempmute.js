exports.run = async (client, message, args) => {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Je ne peux pas trouver cette utilisateur.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Impossible de mute cette utilisateur !");
  
  let muterole =  message.guild.cache.find(r => ["🏝️ No Man's Land"].includes(r.name));
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
  if(!mutetime) return message.reply("You didn't specify a time!");
  
  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
  
  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));
}
