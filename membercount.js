const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const fs = require('fs');
const moment = require("moment")
moment.locale('fr')

  module.exports = {
    name: "membercount", //le nom de la commande pour l'exécution & pour helpcmd[OPTIONAL]
    category: "Information", //la catégorie de commande pour helpcmd [OPTIONAL]
    aliases: [], //les alias de la commande pour helpcmd [OPTIONAL]
    cooldown: 5, //le temps de recharge de la commande pour l'exécution et pour helpcmd [OPTIONAL]
    usage: "member", //l'utilisation de la commande pour helpcmd [OPTIONAL]
    description: "Affiche le nombre de membres en DETAIL", //la description de la commande pour helpcmd [OPTIONAL]
    memberpermissions: [], //Autoriser uniquement les membres disposant d'autorisations spécifiques à exécuter une commande [OPTIONAL]
    requiredroles: [], //Autoriser uniquement des utilisateurs spécifiques avec un rôle à exécuter une commande [OPTIONAL]
    alloweduserids: [], //Autoriser uniquement des utilisateurs spécifiques à exécuter une commande [OPTIONAL]
    minargs: 0, // arguments minimum pour le message, 0 == aucun [OPTIONAL]
    maxargs: 0, // maximum d'arguments pour le message, 0 == aucun [OPTIONAL]
    minplusargs: 0, // arguments minimum pour le message, séparés par "++" , 0 == aucun [OPTIONAL]
    maxplusargs: 0, // maximum d'arguments pour le message, séparés par "++" , 0 == aucun [OPTIONAL]
    argsmissing_message: "", //Message si l'utilisateur n'a pas assez d'arguments / pas assez plus d'arguments, qui seront envoyés, laissez vide / ne pas ajouter, si vous voulez utiliser command.usage ou le message par défaut ! [OPTIONAL]
    argstoomany_message: "", //Message si l'utilisateur a trop / pas assez d'arguments / trop d'arguments plus, qui seront envoyés, laissez vide / ne pas ajouter, si vous voulez utiliser command.usage ou le message par défaut ! [OPTIONAL]
    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
    await message.guild.members.fetch();

    
  let totalformat = db.fetch(`memberf_${message.guild.id}`)
  const member = message.guild.members.cache
  const onlines = member.filter(u => u.presence?.status === 'online').size
  const dnd = member.filter(u => u.presence?.status === 'dnd').size
  const idle = member.filter(u => u.presence?.status === 'idle').size
  let offline = member.filter(m => !m.presence || m.presence?.status == "offline").size
  const members = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const activities = members.presence?.activities?.map((x, i) => 
  `${i+1} - ${x.emoji ? x.emoji.toString()+ "・" : ""}${x.id === "custom" ? `${x.state ? x.state : "Aucune activité"}` : x.type.replace("LISTENING", "Ecoute").replace("WATCHING", "Regarde").replace("PLAYING", "Joue à").replace("STREAMING", "Stream") + ` ** ${x.name}**`}`)
  .join("\n") || "Aucune"
  if (!members) return;



  message.reply({embeds: [new Discord.MessageEmbed()
  .setAuthor(`📊 Paramètres à propos des compteurs de membre de ${message.guild.name}`, message.author.avatarURL({ dynamic: true }))
  .addField("`👤`  Compteur total des membres sur le serveur",`${message.guild.memberCount}`, true)
  .addField("`🟢` Compteur des membres en ligne:", `${onlines}`, true)
  .addField("`🟡` compteur des membres Inactif:", `${idle}`, true)
  .addField("`🔴` Compteur des membres Ne pas déranger:", `${dnd}`, true)
  .addField("`⚫` compteur total des membres hors ligne:", `${offline}`, true)
  .addField(`👥 Membres » ${message.guild.memberCount} `, `> 🟢 En ligne [»](https://discord.com) **${onlines}** > 🔴 Ne pas déranger [»](https://discord.com) **${dnd}** > 🟡Inactif [»](https://discord.com) **${idle}** > ⚫ Hors ligne [»](https://discord.com) **${offline}**
  ────────────
  **${message.guild.members.cache.filter(member => !member.user.bot).size}** Humains [»](https://discord.com) **${message.guild.members.cache.filter(member => member.user.bot).size}** Robots`)
  .setTimestamp()  
  .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL(), })
  .setDescription(`**Statut: ${activities} **`)
  .setColor('2f3135')
  
]});
    }
  catch (e) {
    console.log(String(e.stack).bgRed)
    return message.reply({embeds: [new MessageEmbed()
    .setColor('2f3135')
    .setTitle(`❌ ERROR | Une erreur s'est produite`)
    .setDescription(`\`\`\`${e}\`\`\``)
    ]});
    }
    }
    }