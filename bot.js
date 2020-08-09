const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require('quick.db');
const http = require("http");
const express = require("express");
const ms = require('parse-ms')
const Canvas = require('canvas')
const instagram = require("user-instagram");
const moment = require('moment');
require('./util/eventLoader')(client);

const app = express();
 
app.get("/", (request, response) => {
  //console.log(Date.now() + " BOT Aktif.");
  //response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me`);
}, 1000 * 60 * 3);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
   log(`${files.length} komut yüklenecek.`);
   files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});  

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on("messageUpdate", (old, nev) => {
  if (old.content != nev.content) {
    const yasak = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
      "sg",
      "oç",
      "oçe",
      "anan",
      "ananı",
      "ananı sikim",
      "anneni sikim",
      "anneni sikeyim",
      "ananı sikeyim",
      "annen",
      "ağzına",
      "ağzına sıçim",
      "ağzına sıçayım",
      "ağzına s",
      "am",
      "ambiti",
      "amını",
      "amını s",
      "amcık",
      "amcik",
      "amcığını",
      "amciğini",
      "amcığını",
      "amcığını s",
      "amck",
      "amckskm",
      "amcuk",
      "amına",
      "amına k",
      "amınakoyim",
      "amına s",
      "amunu",
      "amını",
      "amın oğlu",
      "amın o",
      "amınoğlu",
      "amk",
      "aq",
      "amnskm",
      "anaskm",
      "ananskm",
      "amkafa",
      "amk çocuğu",
      "amk oç",
      "piç",
      "amk ç",
      "amlar",
      "amcıklar",
      "amq",
      "amındaki",
      "amnskm",
      "ananı",
      "anan",
      "ananın am",
      "ananızın",
      "aneni",
      "aneni s",
      "annen",
      "anen",
      "ananın dölü",
      "sperm",
      "döl",
      "anasının am",
      "anası orospu",
      "orospu",
      "orosp,",
      "kahpe",
      "kahbe",
      "kahße",
      "ayklarmalrmsikerim",
      "ananı avradını",
      "avrat",
      "avradını",
      "avradını s",
      "babanı",
      "babanı s",
      "babanın amk",
      "annenin amk",
      "ananın amk",
      "bacı",
      "bacını s",
      "babası pezevenk",
      "pezevenk",
      "pezeveng",
      "kaşar",
      "a.q",
      "a.q.",
      "bitch",
      "çük",
      "yarrak",
      "am",
      "cibiliyetini",
      "bokbok",
      "bombok",
      "dallama",
      "göt",
      "götünü s",
      "ebenin",
      "ebeni",
      "ecdadını",
      "gavat",
      "gavad",
      "ebeni",
      "ebe",
      "fahişe",
      "sürtük",
      "fuck",
      "gotten",
      "götten",
      "göt",
      "gtveren",
      "gttn",
      "gtnde",
      "gtn",
      "hassiktir",
      "hasiktir",
      "hsktr",
      "haysiyetsiz",
      "ibne",
      "ibine",
      "ipne",
      "kaltık",
      "kancık",
      "kevaşe",
      "kevase",
      "kodumun",
      "orosbu",
      "fucker",
      "penis",
      "pic",
      "porno",
      "sex",
      "sikiş",
      "s1kerim",
      "s1k",
      "puşt",
      "sakso",
      "sik",
      "skcm",
      "siktir",
      "sktr",
      "skecem",
      "skeym",
      "slaleni",
      "sokam",
      "sokuş",
      "sokarım",
      "sokarm",
      "sokaym",
      "şerefsiz",
      "şrfsz",
      "sürtük",
      "taşak",
      "taşşak",
      "tasak",
      "tipini s",
      "yarram",
      "yararmorospunun",
      "yarramın başı",
      "yarramınbaşı",
      "yarraminbasi",
      "yrrk",
      "zikeyim",
      "zikik",
      "zkym"
    ];

    if (yasak.some(banned => nev.content.includes(banned))) {
      if (!nev.member.hasPermission("MANAGE_MESSAGES")) {
        try {
          nev.delete();
          nev.channel.send(
            `<@${nev.author.id}>, bu sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`
          );
          nev.author.send(
            `<@${nev.author.id}>, **${nev.guild.name}** adlı sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
});

client.on("message", async msg => {
  
  
 const i = await db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["Yarrak","Sülaleni","Yarak","Yarrağım","AMMINA","öç","Ananı","Sikim","oruspu","ORRUSPU","çocuğu","Koyim","Amına","oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk","Amına koyim","Koyim","Amına","oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu","sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${newMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["Koyim","Amına","oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq","amq",];
        if (kufur.some(word => newMessage.content.includes(word))) {
          try {
            if (!newMessage.member.hasPermission("BAN_MEMBERS")) {
                  newMessage.delete();
                          
                      return newMessage.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});
  
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│2 Kişilik Oda')) {
        newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(2)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│3 Kişilik Oda')) {
        newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(3)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    // todo create channel
    if (newMember.voiceChannel != null && newMember.voiceChannel.name.startsWith('➕│4 Kişilik Oda')) {
        newMember.guild.createChannel(`║👤 ${newMember.displayName}`, {
            type: 'voice',
            parent: newMember.voiceChannel.parent
       }).then(cloneChannel => {
        newMember.setVoiceChannel(cloneChannel)
        cloneChannel.setUserLimit(4)
      })
    }
    // ! leave
    if (oldMember.voiceChannel != undefined) {
        if (oldMember.voiceChannel.name.startsWith('║👤 ')) {
            if (oldMember.voiceChannel.members.size == 0) {
                oldMember.voiceChannel.delete()
            }
            else { // change name
                let matchMember = oldMember.voiceChannel.members.find(x => `║👤 ${x.displayName}` == oldMember.voiceChannel.name);
                if (matchMember == null) {
                    oldMember.voiceChannel.setName(`║👤 ${oldMember.voiceChannel.members.random().displayName}`)
                }
            }
        }
    }
});

const request = require('node-superfetch');
const crypto = require('crypto');
const { IMGUR_KEY } = process.env;
const yes = ['evet'];
const no = ['hayir']
const deleteCommandMessages = function (msg, client) { // eslint-disable-line consistent-return
        if (msg.deletable && client.provider.get('global', 'deletecommandmessages', false)) {
          return msg.delete();
        }
  };
class Util {
        static wait(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
        }
        static shuffle(array) {
                const arr = array.slice(0);
                for (let i = arr.length - 1; i >= 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        const temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                }
                return arr;
        }
        static list(arr, conj = 'and') {
                const len = arr.length;
                return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
        }
        static shorten(text, maxLen = 2000) {
                return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
        }
        static duration(ms) {
                const sec = Math.floor((ms / 1000) % 60).toString();
                const min = Math.floor((ms / (1000 * 60)) % 60).toString();
                const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
                return `${hrs.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
        }
        static randomRange(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        static trimArray(arr, maxLen = 10) {
                if (arr.length > maxLen) {
                        const len = arr.length - maxLen;
                        arr = arr.slice(0, maxLen);
                        arr.push(`${len} more...`);
                }
                return arr;
        }
        static base64(text, mode = 'encode') {
                if (mode === 'encode') return Buffer.from(text).toString('base64');
                if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
                throw new TypeError(`${mode} is not a supported base64 mode.`);
        }
        static hash(text, algorithm) {
                return crypto.createHash(algorithm).update(text).digest('hex');
        }
        static async randomFromImgurAlbum(album) {
                const { body } = await request
                        .get(`https://api.imgur.com/3/album/${album}`)
                        .set({ Authorization: `Client-ID ${IMGUR_KEY}` });
                if (!body.data.images.length) return null;
                return body.data.images[Math.floor(Math.random() * body.data.images.length)].link;
        }
        static today(timeZone) {
                const now = new Date();
                if (timeZone) now.setUTCHours(now.getUTCHours() + timeZone);
                now.setHours(0);
                now.setMinutes(0);
                now.setSeconds(0);
                now.setMilliseconds(0);
                return now;
        }
        static tomorrow(timeZone) {
                const today = Util.today(timeZone);
                today.setDate(today.getDate() + 1);
                return today;
        }
        static async awaitPlayers(msg, max, min, { text = 'join game', time = 30000 } = {}) {
                const joined = [];
                joined.push(msg.author.id);
                const filter = res => {
                        if (msg.author.bot) return false;
                        if (joined.includes(res.author.id)) return false;
                        if (res.content.toLowerCase() !== text.toLowerCase()) return false;
                        joined.push(res.author.id);
                        return true;
                };
                const verify = await msg.channel.awaitMessages(filter, { max, time });
                verify.set(msg.id, msg);
                if (verify.size < min) return false;
                return verify.map(message => message.author);
        }
        static async verify(channel, user, time = 30000) {
                const filter = res => {
                        const value = res.content.toLowerCase();
                        return res.author.id === user.id && (yes.includes(value) || no.includes(value));
                };
                const verify = await channel.awaitMessages(filter, {
                        max: 1,
                        time
                });
                if (!verify.size) return 0;
                const choice = verify.first().content.toLowerCase();
                if (yes.includes(choice)) return true;
                if (no.includes(choice)) return false;
                return false;
        }
}
module.exports = Util;

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on("message", async message => {
  if(message.author.id === client.user.id) return;
  if(message.guild) return;
  client.channels.get('738919661353304084').send(new Discord.RichEmbed().setAuthor("Yeni Bir DM", client.user.avatarURL).setFooter(message.author.tag, message.author.avatarURL).setDescription(`**Gönderenin ID:** ${message.author.id}`).setTimestamp().addField("Mesaj", message.content).setColor("RANDOM"))
})

client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kurulum") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send("Sunucu Zaten Ayarlanmış")
  message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **kabul** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kullanabilir");
      message.channel.awaitMessages(response => response.content === 'kabul', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
        
         message.guild.owner.send('Heyo, Sunucunuz Kuruluyor... Bu Biraz Zaman Alabilir!')
       message.guild.channels.forEach(function(kan) {
       message.guild.roles.forEach(function(rol) {
                 kan.delete()
                 rol.delete()
       })}) 
        
        
   message.guild.createChannel('✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])


        
 message.guild.createChannel('【📃 】кυяαℓℓαя', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
 message.guild.createChannel('「💚」gelen-giden', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
       message.guild.createChannel('【👑】sayaç', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
             message.guild.createChannel('【🎉】çєкιℓιş', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
            message.guild.createChannel('【📢 】∂υуυяυℓαя', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
        
                    message.guild.createChannel('【🎀】ραятηєя', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Duyuru Kanalları▬  ▬ ✮")));
        

       }) 
       .then((collected) => {
        message.guild.createChannel('✮ ▬  ▬ Metin Kanalları▬  ▬ ✮', 'category', [{
       id: message.guild.id,
     }]);
             
      message.guild.createChannel(`【🎁】şikayet-ve-öneriler`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));
     message.guild.createChannel(`【👥】video-duyurular`, 'text')
     .then(channel =>
            channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));
     message.guild.createChannel(`【📷】galeri-odası`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));
     message.guild.createChannel(`【🤖】bot-komut`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));
     message.guild.createChannel(`【👻】sohbet-odası`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Metin Kanalları▬  ▬ ✮")));

      message.guild.createChannel(`🌹》Kurucu Odası`, "voice")
      .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "✮ ▬  ▬ Ses Kanalları▬  ▬ ✮|")))
      .then(c => {
        let role = message.guild.roles.find("name", "@everyone");
        let role2 = message.guild.roles.find("name", "Kurucu");
        
        c.overwritePermissions(role, {
            CONNECT: false,
        });
        c.overwritePermissions(role2, {
            CONNECT: true,
            
        });
    })

    message.guild.createChannel('|▬▬|Ses Kanalları|▬▬|', 'category', [{
      id: message.guild.id,
    }]);

    message.guild.createChannel(`👍》Sesli Yönetici Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|Ses Kanalları|▬▬|")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "Kurucu");
      let role3 = message.guild.roles.find("name", "Yönetici");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
      });
  })

  message.guild.createChannel(`💬》Sesli Sohbet Odası`, "voice")
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|Ses Kanalları|▬▬|")))
  .then(c => {
    let role = message.guild.roles.find("name", "@everyone");
    c.overwritePermissions(role, {
        CONNECT: true,
    });
})



       message.guild.owner.send("Gerekli Herşey Kuruldu Rahatına Bak! **Sirius  Bot'un kıymetini bil :D**")
     
            })   
    
}
});

client.on("message", m => {
  if (m.channel.id !== "738496552246575225") { //buraya o kanalın ID'si yazılacak.
    return;
  }
  if (m.author.id === m.guild.ownerID) return;
  if (m.attachments.size < 1) {
    m.delete();
  }
});

function extension(attachment) {

    let imageLink = attachment.split('.');

    let typeOfImage = imageLink[imageLink.length - 1];

    let image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);

    if (!image) return '';

    return attachment;

}

client.on('message', async message => {

if(message.channel.id === '738496552246575225') {

  let image = message.attachments.size > 0 ? await extension(message.attachments.array()[0].url) : '';

 if (message.attachments.size < 1) return;

const embed = new Discord.RichEmbed()

.setImage(image)

client.channels.get('739440597617606686').send(embed)

}})
 

client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`)
                .setColor("0x808080")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`📤 ${member.user.tag}, aramızdan ayrıldı, \**${sayac[member.guild.id].sayi}\** kişi olmamıza \**${sayac[member.guild.id].sayi - member.guild.memberCount}\** kişi kaldı!`);
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`📥 ${member.user.tag}, aramıza katıldı **${sayac[member.guild.id].sayi}** kişi olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** kişi kaldı!` );
  } catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
    return console.log(e)
  }
 
});

client.on('guildMemberAdd', async member => {
  let rol = await db.fetch(`otoR_${member.guild.id}`);
  let kanal = await db.fetch(`otoK_${member.guild.id}`);
  let mesaj = await db.fetch(`otomesaj_${member.guild.id}`);
  let rol2 = await db.fetch(`botR_${member.guild.id}`);
  
  if (member.user.bot === true){
    
    if (!rol2) return
    
    member.addRole(member.guild.roles.get(rol2));
  } else {
  
  if (!rol) return
  member.addRole(member.guild.roles.get(rol))
  
  if (!kanal) return
  member.guild.channels.get(kanal).send(`${member} Kullanıcısına \`${member.guild.roles.get(rol).name}\` rolü verildi! **${member.guild.members.size}** Kişiyiz!`)
  }
})

client.on("guildCreate", guild => { // Birisi botu sunucuya attıgında bot özel mesaj atar.
const tesekkurler = new Discord.RichEmbed()
.setTitle(`iBot | Bilgilendirme`)
.setTimestamp()
.setColor("GREEN")
.setDescription(`Beni Sunucuna Eklediğin İçin Teşekkür Ederim \n Sana En İyi Şekilde Hizmet Edeceğim.\n Eğer Bir Sorunla Karşılaşırsan Destek Sunucuma Gel  hhttps://discord.gg/RJp2U2 \n Komutlarımız için **!yardım** komutunu kullanınız.`)
guild.owner.send(tesekkurler)


});

client.on('guildMemberAdd',async member => { // Güvenlik Sistemi
  let user = client.users.get(member.id);
  let kanal = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627428441695977497/gvnlk-spheli.png')
    const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627427731407241226/gvnlk-gvnli.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1

       const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627425996454232064/gvnlk-arka.png');
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   if (!kanal) return
       const attachment = new Discord.Attachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});

const invites = {};


const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

  wait(1000);


  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
   
client.on("roleCreate", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    rolee.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(
        "Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi! (Rol Koruma Sistemi)"
      )
      .setColor("BLACK");
    rolee.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});

client.on("guildCreate", guild => {  // sunucuya eklendim ve atıldım
let add = client.channels.get("680416054471557360")
const eklendim = new Discord.RichEmbed()

.setTitle(`Sunucuya Eklendim`)
.setTimestamp()
.setColor("GREEN")
.setThumbnail(guild.iconURL)
.addField(`Sunucu İsmi`,guild.name)
.addField(`Sunucu ID`, guild.id)
.addField(`Kurucu`,guild.owner.user.tag)
.addField(`Kurucu ID`,guild.owner.user.id)
.addField(`Üye Sayısı`,guild.memberCount)

add.send(eklendim)

});

client.on("guildDelete", guild => {
let remove = client.channels.get("680416054471557360")
const atildim = new Discord.RichEmbed()

.setTitle(`Sunucudan Atıldım`)
.setTimestamp()
.setColor("RED")
.setThumbnail(guild.iconURL)
.addField(`Sunucu İsmi`,guild.name)
.addField(`Sunucu ID`, guild.id)
.addField(`Kurucu`,guild.owner.user.tag)
.addField(`Kurucu ID`,guild.owner.user.id)
.addField(`Üye Sayısı`,guild.memberCount)

remove.send(atildim)

});

client.on("channelCreate", async (channel, member, guild) => {
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (kanal == "acik") {
    channel.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(
        "Sunucunuzda yeni bir kanal oluşturuludu! fakat geri silindi! ( Kanal Koruma Sistemi) "
      )
      .setColor("BLACK");
    channel.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});

client.on("message", async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
        
    let i = await db.fetch(`reklamFiltre_${msg.guild.id}`) 
          if (i == 'acik') {
              const reklam = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                   
                    let embed = new Discord.RichEmbed()
                    .setColor(0xffa300)
                    .setFooter('𓇻 S I R I U S -|-  Reklam engellendi.', client.user.avatarURL)
                    .setAuthor(msg.guild.owner.user.username, msg.guild.owner.user.avatarURL)
                    .setDescription("𓇻 S I R I U S  Reklam sistemi, " + `***${msg.guild.name}***` + " adlı sunucunuzda reklam yakaladım.")
                    .addField('Reklamı yapan kişi', 'Kullanıcı: '+ msg.author.tag +'\nID: '+ msg.author.id, true)
                    .addField('Engellenen mesaj', msg.content, true)
                    .setTimestamp()                   
                    msg.guild.owner.user.send(embed)                       
                    return msg.channel.send(`${msg.author.tag}, **Reklam Yapmak Yasak!**`).then(msg => msg.delete(25000));
                  }             
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!i) return;
  });

client.on('message', async message => {
const ms = require('ms');
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
let u = message.mentions.users.first() || message.author;
if (command === "rol-kur") {
if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
message.channel.send(`Bot Gerekli Rollerin kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
if (!message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 10000,
errors: ['time'],
})

message.guild.createRole({
name: '💎 | Sunucu Sahip',
color: 'ff0000',
permissions: [
"ADMINISTRATOR",
]
})


message.guild.createRole({
name: '🌺 | Genel Sorumlu',
color: '49ff00',
permissions: [
"MANAGE_GUILD",
"MANAGE_ROLES",
"MUTE_MEMBERS",
"DEAFEN_MEMBERS",
"MANAGE_MESSAGES",
"MANAGE_NICKNAMES",
"KICK_MEMBERS"
]
})

message.guild.createRole({
name: '💮 | Yönetici',
color: 'ffb400',
permissions: [
"MANAGE_GUILD",
"MANAGE_ROLES",
"MUTE_MEMBERS",
"DEAFEN_MEMBERS",
"MANAGE_MESSAGES",
"MANAGE_NICKNAMES"
]
})
  
  
message.guild.createRole({
name: '🔨 | Partner Sorumlusu',
color: '#FF4D00'
})

message.guild.createRole({
name: '💸 | Booster',
color: '#FF77FF',
})
  
message.guild.createRole({
name: '♾️ | Mustafa Kemal Atatürk',
color: '#ED9121',
})
  
message.guild.createRole({
name: '🎑 | Developer',
color: '#FFCC00',
})
  
message.guild.createRole({
name: '🌻 | Family',
color: '#FF8C69',
})
  
message.guild.createRole({
name: '⚜ | Partner',
color: '#002FA7'
})
  
message.guild.createRole({
name: '🔫 | Tek Tabanca',
color: '#00CCCC',
})
  
message.guild.createRole({
name: '💖 | Sevgiler',
color: '#CD00CC',
})
  
message.guild.createRole({
name: '🌌 | Kız',
color: 'd300ff',
})

message.guild.createRole({
name: '🌃 | Erkek',
color: '#0000FF',
})

message.guild.createRole({
name: '🛡 | Discord Bot',
color: '0006ff',
})

message.channel.send("⍫ Gerekli Roller 🌹")


}
});

client.on('messageDelete', async message   => { // mod-log
      let modlogs = db.get(`tc-modlog_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("BLUE")
  .setTitle("MESAJ SİLİNDİ")
.setDescription(`<@!${message.author.id}> adlı kullanıcı tarafından <#${message.channel.id}> kanalına gönderilen mesaj silindi!\n\nSilinen Mesaj: **${message.content}**`)
  .setFooter("SIRIUS |  Mod-Log")
  modlogkanal.sendEmbed(embed);
  })


client.on('guildBanAdd', async message  => {
      let modlogs = db.get(`tc-modlog_${message.guild.id}`)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("BLUE")

	.setDescription(`Üye Sunucudan Yasaklandı! \n<@!${message.user.id}>, ${message.user.tag}`)
		.setThumbnail(message.user.avatarURL)
  .setFooter("SIRIUS | mod-log")
  modlogkanal.sendEmbed(embed);
  })
client.on('channelCreate', async channel  => {
      let modlogs = db.get(`tc-modlog_${channel.guild.id}`)
    const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
	if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
					.setColor('RANDOM')
				.setDescription(`${channel.name} adlı metin kanalı oluşturuldu.`)
				.setFooter(`,SIRIUS-BOT | Mod-Log Sistemi Kanal ID: ${channel.id}`)
				modlogkanal.send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor('RANDOM')
.setTitle("SES KANALI OLUŞTURULDU")
				.setDescription(`${channel.name} adlı ses kanalı oluşturuldu!`)
				.setFooter(`SIRIUS | Mod-Log Sistemi Kanal ID: ${channel.id}`)

				modlogkanal.send({embed});
			}
		
	})
client.on('channelDelete', async channel  => {
      let modlogs = db.get(`tc-modlog_${channel.guild.id}`)
    const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);    
if (!modlogkanal) return;
	if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
					.setColor('RANDOM')
				.setDescription(`${channel.name} adlı metin kanalı silini!`)
				.setFooter(`SIRIUS | Mod-Log Sistemi Kanal ID: ${channel.id}`)
				modlogkanal.send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor('RANDOM')
.setTitle("SES KANALI SİLİNDİ")
				.setDescription(`${channel.name} adlı ses kanalı silindi`)
			.setFooter(`SIRIUS-BOT | Mod-Log Sistemi  Kanal ID: ${channel.id}`)
				modlogkanal.send({embed});
			}
	})
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (oldMsg.author.bot) return;
  var user = oldMsg.author;
  if (db.has(`tc-modlog_${oldMsg.guild.id}`) === false) return;
  var kanal = oldMsg.guild.channels.get(db.fetch(`tc-modlog_${oldMsg.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField("Kullanıcı", oldMsg.author.tag, true)
  .addField("Eski Mesaj",`  ${oldMsg.content}  `)
  .addField("Yeni Mesaj", `${newMsg.content}`)
  .setThumbnail(oldMsg.author.avatarURL)
  kanal.send(embed);  
		
	})

client.on('message', async message => {
    if (message.content === 'fakegiriş') {
        client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

client.on('message', async message => {
    if (message.content === 'fakeçıkış') {
        client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }
});

/// LEVEL BOT.JS ///

client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var id = message.author.id;
  var gid = message.guild.id;

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    //CodEming/Ft.Yasin..
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels
          .get(kanal.id)
          .send(
            message.member.user.username +
              "** Seviye Atladı! Yeni seviyesi; `" +
              lvl +
              "` Tebrikler! :tada: **"
          );

        //zepo
      }
      //zepo
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).addRole(seviyerol);
        if (kanal) {
          client.channels
            .get(kanal.id)
            .send(
              message.member.user.username +
                "** Yeni Seviyesi **" +
                rollvl +
                "**  seviyeye ulaştı ve " +
                seviyerol +
                " Rolünü kazandı! :tada: **"
            );
        }
      }
    }
  }

  //ZEPST
});

client.on('message', async message => { // bot bilgi paneli üye sayısı bot sayısı falan
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "serverpanelkaldır") {
 if (!message.guild.channels.find(channel => channel.name === "Server Panel")) return message.channel.send("**Server Panel Ayarlanmamış!**")
   if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
    const a = message.guild.channels.find(channel => channel.name === "Server Panel").delete()
      if(!a) return console.log("guildStats")
      const b = message.guild.channels.find(channel => channel.name === `Toplam Üye • ${message.guild.members.filter( member => member.user.bot).size} bot / ${message.guild.memberCount} üye`, true)
      if(!b) return console.log("guildStatsMember")
      const c = message.guild.channels.find(channel => channel.name === `Rekor Online •${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`).delete()
      if(!c) return console.log("guildStatsBot")
     const m = message.guild.channels.find(channel => channel.name === `Bot Sayısı • ${client.guilds.reduce((a, b) => a + b.onlinememberCount, 0).toLocaleString()}`).delete()
      if(!m) return console.log("guildStatsOnlineBot")
      const d = message.guild.channels.find(channel => channel.name === `Toplam Kanal: ${client.channels.size.toLocaleString()}`).delete() //|| message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-1}`).delete() || message.guild.channels.find(channel => channel.name === `Kanal sayısı: ${message.guild.channels.size-2}`).delete()
      if(!d) return console.log("guildStatsChannel")
      message.channel.send("**Kanallar Temizlendi!**")
    }
  if (command === "serverpanel") {
  if (message.guild.channels.find(channel => channel.name === "Server Panel")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`**Server Panel Odalarının Kurulumunun Başlamasını İstiyorsanız 'başlat Yazınız!'**`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Yetkin bulunmuyor.");
      message.channel.awaitMessages(response => response.content === 'başlat', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('Server Panel', 'category', [{
  id: message.guild.id,
  deny: ['SPEAK'],
  deny: ['CONNECT']  
}]);
        
 message.guild.createChannel(`Toplam Üye • ${message.guild.memberCount}`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Server Panel")));
message.guild.createChannel(`Çevrimiçi Üye • ${client.users.filter(cfx => cfx.presence.status === 'online').size}`, 'voice')
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "Server Panel")));
message.guild.createChannel(`Botlar •  ${message.guild.members.filter(m => m.user.bot).size}`, 'voice')
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "Server Panel")));
message.guild.createChannel(`Rekor Online • Bakımda!`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "Server Panel")));
  message.channel.send("Bot Bilgi Paneli Ayarlandı!")
 
        })    
    
}
});


client.on('ready', () => { // davet takip

  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  
  
 
  member.guild.fetchInvites().then(guildInvites => {
    
    if (db.has(`dKanal_${member.guild.id}`) === false) return
    const channel = db.fetch(`dKanal_${member.guild.id}`).replace("<#", "").replace(">", "")
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).users < i.uses);

    const davetçi = client.users.get(invite.inviter.id);
     db.add(`davet_${invite.inviter.id + member.guild.id}`,1)
let bal  = db.fetch(`davet_${invite.inviter.id + member.guild.id}`)
     member.guild.channels.get(channel).send(`:inbox_tray: ** <@${member.id}> Joined**; İnvited by **${davetçi.tag}** (`+'**'+bal+'** invites)')
  })

});
client.on("guildMemberRemove", async member => {

    member.guild.fetchInvites().then(guildInvites => {

      const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).users < i.uses);

       db.subtract(`davet_${invite.inviter.id + member.guild.id}`,1)
    })
})

client.login(ayarlar.token);
