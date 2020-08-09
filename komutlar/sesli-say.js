const Discord = require("discord.js");
const { oneLine, stripIndents } = require('common-tags');
module.exports.run = async (client, message, args) => {

  if (!message.member.roles.has("738541583473049761") && !message.member.hasPermission("MANAGE_MESSAGES") ) 
   return message.channel.send(hata).then(m =>m.delete(10000))
    let guild = "685800026223673365";
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  var msg = message;
  var üyesayısı = msg.guild.members.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
  '0': `<a:0_:739089258211704862>`,
    '1': `<a:1_:739089267929776229>`,
    '2': `<a:2_:739089274926006344>`,
    '3': `<a:3_:739089281892745237>`,
    '4': `<a:4_:739089289509339196>`,                       
    '5': `<a:5_:739089299059769394>`,
    '6': `<a:6_:739089327589687337>`,
    '7': `<a:7_:739089310925717535>`,
    '8': `<a:8_:739089335436967957>`,
    '9': `<a:9_:739089342957486100>`}[d];
      })
    }/////////////////////////////
  var sessayı = count.toString().replace(/ /g, "    ")
  var üs2 = sessayı.match(/([0-9])/g)
  sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs2) {
    sessayı = sessayı.replace(/([0-9])/g, d => {
      return {
  '0': `<a:0_:739089258211704862>`,
    '1': `<a:1_:739089267929776229>`,
    '2': `<a:2_:739089274926006344>`,
    '3': `<a:3_:739089281892745237>`,
    '4': `<a:4_:739089289509339196>`,                       
    '5': `<a:5_:739089299059769394>`,
    '6': `<a:6_:739089327589687337>`,
    '7': `<a:7_:739089310925717535>`,
    '8': `<a:8_:739089335436967957>`,
    '9': `<a:9_:739089342957486100> `}[d];
      })
    }
  /////////////////////////////////////////
  var tagdakiler = 0;
  let tag = "✶";
  message.guild.members.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
    }  
  })
  var tagdakilerr = tagdakiler.toString().replace(/ /g, "    ")
  var üs3 = tagdakilerr.match(/([0-9])/g)
  tagdakilerr = tagdakilerr.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs3) {
    tagdakilerr = tagdakilerr.replace(/([0-9])/g, d => {
      return {
  '0': `<a:0_:739089258211704862>`,
    '1': `<a:1_:739089267929776229>`,
    '2': `<a:2_:739089274926006344>`,
    '3': `<a:3_:739089281892745237>`,
    '4': `<a:4_:739089289509339196>`,                       
    '5': `<a:5_:739089299059769394>`,
    '6': `<a:6_:739089327589687337>`,
    '7': `<a:7_:739089310925717535>`,
    '8': `<a:8_:739089335436967957>`,
    '9': `<a:9_:739089342957486100> `}[d];
      })
    }
  //////////////////////////////////////////
  var onlayn = message.guild.members.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
  var üs4= onlayn.match(/([0-9])/g)
  onlayn = onlayn.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs4) {
    onlayn = onlayn.replace(/([0-9])/g, d => {
      return {
  '0': `<a:0_:739089258211704862>`,
    '1': `<a:1_:739089267929776229>`,
    '2': `<a:2_:739089274926006344>`,
    '3': `<a:3_:739089281892745237>`,
    '4': `<a:4_:739089289509339196>`,                       
    '5': `<a:5_:739089299059769394>`,
    '6': `<a:6_:739089327589687337>`,
    '7': `<a:7_:739089310925717535>`,
    '8': `<a:8_:739089335436967957>`,
    '9': `<a:9_:739089342957486100> `}[d];
      })
    }
  ///s   farkıyla bebeğim
const emoji1 = client.emojis.get("739089349781487636")
 const embed1 = new Discord.RichEmbed()
 .setColor('000000')
 .setAuthor('SIRIUS')
 .setDescription(`${emoji1} **Sunucumuzda Toplam ** ${üyesayısı} **Üye bulunmakta.** \n\n ${emoji1} **Sunucumuzda Toplam** ${onlayn} **Çevrimiçi üye bulunmakta.** \n\n ${emoji1} **Ses kanallarında Toplam** ${sessayı} **Üye bulunmakta.** \n\n ${emoji1} **Tagımızda Toplam ** ${tagdakilerr} **Kişi bulunmakta.**`)
 .setFooter(`Komutu Kullanan Yetkili: ${message.author.username}`)
 
     const hata = new Discord.RichEmbed()
    .setColor('000000')
    .setAuthor(`Hata`)
    .setDescription(`**Bu komutu kullanmaya hakkınız yoktur!**`)
 
  msg.channel.send(embed1);
  
  /*client.setInterval(() => {
  let channel = client.channels.get("694870726280347668"); 
  channel.setTopic(`Toplam üye: _${üyesayısı.toString()}_ / Çevrimiçi üye: ${onlayn}`); //kanal açıklama oto
}, 10000);*/
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["total",'toplam','say','info'],
  permLevel: 0
};
exports.help = {
  name: 'say'
}