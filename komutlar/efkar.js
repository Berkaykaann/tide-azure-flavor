  exports.run = async (client, msg, args) => {
    let ask=[
      "Efkar %3 Gösteriyor.İyisin iyi",
      "Efkar %6 Gösteriyor.Olsun be",
      "Efkar %9 Gösteriyor.Hadi hadi toparlan!",
      "Efkar %12 Gösteriyor.Efkarımız yok mu bu geceğğğ",
      "Efkar %18 Gösteriyor.",
      "Efkar %20 Gösteriyor.",
      "Efkar %23 Gösteriyor.",
      "Efkar %26 Gösteriyor.",
      "Efkar %29 Gösteriyor.",
      "Efkar %30 Gösteriyor.",
      "Efkar %40 Gösteriyor.",
      "Efkar %50 Gösteriyor.",
      "Efkar %60 Gösteriyor.",
      "Efkar %70 Gösteriyor.",
      "Efkar %73 Gösteriyor.",
      "Efkar %76 Gösteriyor.",
      "Efkar %79 Gösteriyor.",
      "Efkar %82 Gösteriyor.",
      "Efkar %85 Gösteriyor.",
      "Efkar %88 Gösteriyor.",
      "Efkar %90 Gösteriyor.",
      "Efkar %91 Gösteriyor.",
      "Efkar %92 Gösteriyor.",
      "Efkar %93 Gösteriyor.",
      "Efkar %94 Gösteriyor.",
      "Efkar %95 Gösteriyor.",
      "Efkar %96 Gösteriyor.",
      "Efkar %97 Gösteriyor.Seni üzen kim söyle bana!",
      "Efkar %98 Gösteriyor. Dırırııı",
      "Efkar %99 Gösteriyor. Hangi cani üzdü seni!",
      "Efkar %100 Gösteriyor Aga bee.",
    ]
      let member = msg.mentions.members.first()
     if(!member)return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: ('🚫 Efkarına bakmak istediğini etiketlemelisin..')
  }});
 
 
 
    else{
    msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`${member} ${ask[Math.floor(Math.random() * 30)]}.`)
    }})
    }
 
 
  }
 
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
   };
 
  exports.help = {
    name: 'efkar',
    description: 'Efkar Ölçmeni sağlar.',
    usage: 'efkar'
   }