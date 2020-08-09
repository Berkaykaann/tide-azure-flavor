const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client,message,args) => {

 if(!message.member.roles.has('738541583473049761')) return message.channel.send('Bu komutu sadece uyarı sorumluları kullanabilir.').then(message => message.delete(6000));
  message.delete(10)
 let kişi = message.mentions.users.first()
  if(!kişi) return message.channel.send('Ben kahin değilim, birini etiketler misin?').then(message => message.delete(8000));
  message.delete()
  let sebep =  args.slice(1).join(' ')
  if(!sebep) return message.channel.send('Bir sebep belirtir misin?').then(message => message.delete(8000));
  message.delete(10)
    let uyarısayı = db.add(`uyarılar_${kişi.id}`, 1)
  if (uyarısayı === null) uyarısayı = 1;
 const embed = new Discord.RichEmbed()
 .setColor('BLUE')
 .setDescription(`${kişi} **adlı kişiye 1. Uyarısını ekledim.** \n **Uyarıyı Veren Yetkili:** <@${message.author.id}> \n **Toplam Uyarı:** \`${uyarısayı}\` \n **Sebebi:** \`${sebep}\``)
client.channels.get('738921526711156959').send(embed)
 
}
exports.conf = {
enabled: false,
guildOnly: false,
aliases: [],
permLevel: 2
}; 
exports.help = {
name: "uyar",
description: "Uyarı verir.",
usage: "uyar"
};
//LUXURİOUS