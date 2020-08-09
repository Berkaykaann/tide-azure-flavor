const Discord = require('discord.js');
exports.run = async(client, message, args, ops) => {
    message.delete()
       if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bu komudu kullanmak için **Rolleri Yönet** yetkisine sahip olmalısın.').setColor(10038562));
    let toverify = message.guild.member(message.mentions.users.first());
    let verifyrole = message.guild.roles.find(`name`, "✅✅✅✅✅✅✅✅✅✅");
    if (!verifyrole) return message.reply("Rol Bulunamadı Lütfen 'Doğulandı' Adıyla Rol Oluşturunuz.");
    if (!toverify) return message.reply("Bir kullanıcıdan bahsetmelisin.");
    await (toverify.addRole(verifyrole.id));
    let vUser = message.guild.member(message.mentions.users.first());
    let verifembed = new Discord.RichEmbed()
        .setTitle("Doğrulama Kullanıcı- Logları")
        .setColor('#a5f23a')
        .addField("Doğrulayan Kişi", `${message.author.tag}`, true)
        .addField("Kanal", message.channel, true)
        .addField("Doğrulanan Kullanıcı", `${vUser}`, true)
        .setTimestamp();
    let veriflog = message.guild.channels.find(`name`, "hesabını-dogrulananlar");
    if (!veriflog) return message.channel.send("Doğrulama Kullanıcı Log Kanalı bulunamadı. Lütfen 'log-kanalı' Adlı Kanal Oluşturunuz.`");
    veriflog.send(verifembed);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
};
exports.help = {
  name: 'doğrula',
  description: 'Kullanıcı İçin Doğrulandı Rolünü Verir.',
  usage: 'doğrula'
};
