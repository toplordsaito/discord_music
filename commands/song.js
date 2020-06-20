const YTDL = require('ytdl-core');
const { MessageEmbed } = require('discord.js');
let queue = []
let dispatcher;

function Play(connection, message) {
    dispatcher = connection.play(YTDL(queue[0]), { filter: "audioonly" })
    dispatcher.on("end", function () {
        queue.shift();
        console.log(queue)
        if (queue[0]) {
            Play(connection, message)
        } else {
            connection.disconnect();
        }
    })
}

let commandPlay = {
    name: 'play',
    description: 'play music',
    execute(msg, args) {
        if (msg.member.voice.channel) {
            msg.member.voice.channel.join()
                .then(connection => {
                    queue.push(args);
                    if (queue.length === 1) {
                        Play(connection, msg)
                    }
                })
                .catch(console.log)
        }
        else {
            msg.reply("You need to join to Voice Channel")
        }
    },
}

let commandPause = {
    name: 'pause',
    description: 'pause music',
    execute(msg, args) {
        dispatcher.pause();
    },
}


let commandResume = {
    name: 'resume',
    description: 'resume music',
    execute(msg, args) {
        dispatcher.resume();
    },
};

let commandSkip = {
    name: 'skip',
    description: 'skip music',
    execute(msg, args) {
        dispatcher.end();
    },
};


let commandClear = {
    name: 'clear',
    description: 'clear music',
    execute(msg, args) {
        queue = []
    },
};

let commandQueue = {
    name: 'queue',
    description: 'check queue',
    execute(msg, args) {
        var embed = new MessageEmbed()
            .setImage(msg.channel.guild.iconURL)
            .setColor('RANDOM')
            .setAuthor('ลำดับคิวเพลงขณะนี้', msg.channel.guild.iconURL)
            .setTimestamp()
            .addField("ลำดับเพลง", queue)
        msg.reply(embed).catch()
    },
};


module.exports = [commandPlay, commandPause, commandResume, commandSkip, commandClear, commandQueue]


