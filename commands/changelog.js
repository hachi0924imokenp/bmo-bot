const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args) => {
    message.delete(message.author);

    const duration = moment.duration(client.uptime).format(" J [Jours], H [heures], m [minutes], s [secondes]");
    message.channel.send({embed: {
    color: '34eb80',
    author: {
      name: 'ありがと ございます#9878',
      icon_url: 'https://cdn.discordapp.com/avatars/251455597738721280/9fcab661f0a8391d5ab53453370fe1fe.png'
    },
    title: "Changelog",
    url: "https://github.com/Cleaner-Discord/bmo-bot/commits/masterhttps://github.com/Cleaner-Discord/bmo-bot/commits/master",
    description: "Suivez ici les mise à jour de mon chère créateur ! :BMOdance:704463259570405447:",
    fields: [{
        name: "Mise à jour du 18/06/20",
        value: "On a ajouter le changelog, c'est plus pratique non ? pour suivre les mises à jour du bot sans passer par Github <:BMOdance:704463259570405447:>"
      },
      {
        name: "Mise à jour du 17/06/20",
        value: "Correctif des problèmes au niveau des arguments sur certaines commandes ! certains texte de réponses on été changer car c'était pas beau à voir <:BMOsad:699766556879618078>"
      },
      {
        name: "Dernière mise à jour effectuer le",
        value: `${duration}`
      },
      {
        name: "Vous voulez voir un peu plus mes mise à jour ?",
        value: "Vous pouvez suivre mon avancement sur mon [Github](https://github.com/Cleaner-Discord/bmo-bot)."
      }
      
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© BMO"
        }
    }
    });
}