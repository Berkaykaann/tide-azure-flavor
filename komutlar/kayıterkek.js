const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let kayityetkili = '701412014559592478' //KAYIT YETKİLİSİ ID
let verbuse = '693092933963874354' //VERİLECEK ROL ID
let verbusem = '682536945284546560' //VERİLECEK ROL ID
let albuse = '682536279841439759' //ALINACAK ROL ID
let albusem = '' //ALINACAK ROL ID l Kullanmicaksanız silin
let isimön = '々 ' //DEĞİŞTİRİLECEK İSMİN ÖNÜNE GELEN
let isimson = '' //DEĞİŞTİRİLECEK İSMİN SONUNA GELEN

//TİK İSMİNDE BİR EMOJİNİZ OLMASI LAZIM (Hareketli Olsa Daha Güzel Gözükür)

  if(!message.member.roles.has(kayityetkili)) 
  if(!message.member.hasPermission("MOVE_MEMBERS"))
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmasınız.`);
  let member = message.mentions.members.first()
  let isim = args.slice(1).join(" ")
  if (!member) return message.channel.send('Bir Üye Etiketlemelisin💖')
  if (!isim) return message.channel.send('Bir İsim Yazmalısın 💖')

  setTimeout(function(){
  member.setNickname(`${isimön}${isim}${isimson}`)
  },2000)
  setTimeout(function(){
  member.addRole(verbuse)
  member.addRole(verbusem)
  },3000)
  setTimeout(function(){
  member.removeRole(albuse)
  member.addRole(albusem)
  },4000)
  
 const emoji = client.emojis.find(emoji => emoji.name === "tik");
 let embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`✅ Kayıt işlemi Başarılı ✅

**Kayıt edilen kullanıcı :** ${isimön}${isim}${isimson}

**Kayıt işleminde verilen rol :** <@&${verbuse}>, <@&${verbusem}>

**Kayıt işleminde alınan rol :** <@&${albuse}>, <@&${albusem}>
`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`) 
  .setImage("https://37.media.tumblr.com/f1d867e7b7771f57ccf325a13630ce29/tumblr_n3zeepZMFm1ttv14wo1_r1_250.gif")
message.channel.send(embed)
message.react(emoji)
}

exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: ['oyuncu','o'],
  permLevel: 0
}
exports.help = {
  name: 'erkek',
  description: "Erkek kullanıcıları kayıt etme komutu.",
  usage: '!erkek <yeni nick>'
}