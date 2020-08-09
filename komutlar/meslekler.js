const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  const discord = client.emojis.get('711648494879768636')
  msg.channel.sendCode("asciidoc", `= MESLEKLER =
• Rehber      :: Cetobae/Göktüğ
• Yönetmen    :: 
• Gazeteci    :: 
• Eklenebilir :: Eklenebilir`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['meslek'],
  permLevel: 0
};

exports.help = {
  name: 'meslekler',
  description: 'Meslekleri gösterir.',
  usage: 'meslekler'
};