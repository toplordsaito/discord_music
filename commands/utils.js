const { MessageEmbed } = require('discord.js');
let introCommand = {
    name: 'แนะนำตัวหน่อย',
    description: 'introduce bot',
    execute(msg, args) {
        var embed = new MessageEmbed()
            .setImage('https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-1/74881523_1000386336975385_1834790740153073664_n.jpg?_nc_cat=107&_nc_sid=dbb9e7&_nc_eui2=AeFGMXZNKMRFm60RbPLsvi0T6FmQK7JOAT_oWZArsk4BP2t3X8lBNSFS9xS300Oh8cL6UBONbaRmX-F91UyuXeeY&_nc_ohc=su00ZR6zz2UAX-6BaCN&_nc_ht=scontent.fbkk22-2.fna&oh=c3bb46cf04421a22a628fe9916f23972&oe=5F14D490')
            .setColor('RANDOM')
            .setAuthor('ฉันคือนักร้องเพลงที่เพราะที่สุด', 'https://vignette.wikia.nocookie.net/blackclover/images/8/8e/Noelle_as_a_child.png')
            .setTimestamp()
            .addField("ชื่อ", 'ตาล')
            .addField("อายุ", '20')
            .addField("ความน่ารัก", '999999999')
        msg.reply(embed).catch()
    },
};
module.exports = [introCommand]