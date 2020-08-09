const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const juke = new Discord.RichEmbed()
    .setColor('GOLD')
    .setAuthor(`SIRIUS | Eğlence Komutları`, client.user.avatarURL) 
      .setDescription('**[Website](https://discord.gg/v5pKcyd)**')
.setThumbnail(client.user.avatarURL)
      .addField('**Komutlar:**', '`espri`, `rip`, `kralol`, `1vs1`,`wasted`, `yazı-tura`, `doğrulukcesaret`, `alkış`, `dcdekiyıkık`, `tutuklandın`, `tkm`, `sigarayak`, `aşkölçer`, `mesajdöndür`, `balıktut`, `spoiler`, `stresçarkı`, `manzara`, `atasözü`, `steam`, `ateşle`, `kapaklaflar`')
    .setFooter(``, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(juke).catch()

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'eğlence',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};