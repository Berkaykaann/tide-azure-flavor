const Discord = require('discord.js');

exports.run = async(client, message) => {

    const rules = new Discord.RichEmbed()
    
      .setColor('RED')
      .addField(`Kurallar`, [`
      
      - Küfür, argo ve reklam kesinlikle **yasaktır**!
      - Spam ve flood **yasaktır**!
      - Din, ırk ve siyaset konuşmak **yasaktır**!
      - Herkes birbirine saygılı olmalıdır!
      - Herkesin görüşü kendinedir bu yüzden tartışmak **yasaktır**!
      - Üstünlük göstermek/taslamak **yasaktır**!
      - Aşırı Caps ve emoji kullanımı **yasaktır**!
      - Oynuyor kısmına reklam, küfür koymak **yasaktır**!
      - Yetkililere karşı gelmek **yasaktır**!
      - Private odalardaki insanları rahatsız etmek **yasaktır**!
      - Seslerde ve Chatte aşırı küfür **yasaktır**!
      - Seslerde değişik ve rahatsız edici sesler çıkarmak açmak **yasaktır**!
      - Başkalarına ait kişisel bilgileri paylaşmak **yasaktır**!
      - Bot basmak/j4j yapmak **yasaktır**!
      - Rahatsızlık vermek **yasaktır**! \n\n
      - SUNUCUYA GİRDİĞİNİZ ANDA OKUMUŞ SAYILACAKSINIZ!

      `])

       message.delete();
      //message.react("?");

    return message.channel.send(rules).then(keleS => keleS.react("?"));

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rules'],
    permLevel: 0
}

exports.help = {
    name : 'kurallar',
    description: 'Hazır kuralları kanalınıza atar.',
    usage: '<prefix>kurallar/rules'
}