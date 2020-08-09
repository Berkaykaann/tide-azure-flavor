const superagent = require("snekfetch");
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  superagent.get("https://nekos.life/api/v2/img/woof").end((err, response) => {
    const embed = new Discord.RichEmbed()
      .setAuthor(`Kopek!`)
      .setTitle("Resime Gitmek İçin Tıkla")
      .setImage(response.body.url)
      .setColor("RED")
      .setURL(response.body.url);
    message.channel.send(embed);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "kopek",
  description: "random dog pics",
  usage: "kopek"
};