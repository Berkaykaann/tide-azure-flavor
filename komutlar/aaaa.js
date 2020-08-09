const Discord = require('discord.js')

exports.run = async (client ,message ,args) => {
  const emoji = client.emojis.find(emoji => emoji.name === "tik");
  const onay = client.emojis.get('738938310185058405')
  const discord = client.emojis.get('738964454175146025')
  const disscord = client.emojis.get('738964482902196254')
  let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`${onay} Taglarımız ${onay} 
  
**${discord} Oyun içi Tag > 𝚂𝙸𝚁𝙸𝚄𝚂  **

**${disscord} Discord tag > ✶  **
`)
  .setFooter(`Komutu kullanan : ${message.author.username}`) 
message.channel.send(embed)
message.react(emoji)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tag'],
  permLevel: 0
};
exports.help = {
  name: "tag"
}; //KOMUTLAR
