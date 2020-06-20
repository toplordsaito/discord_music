require('dotenv').config();
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const commands = require(`./commands/${file}`);
    commands.forEach(command => {
        client.commands.set(command.name, command);
    });

}

let queue = []
let dispatcher;

client.login(TOKEN);

client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(PREFIX)) return
    if (msg.channel.type === "dm") return;

    const input = msg.content.slice(PREFIX.length).split(' ');
    const command = input.shift().toLowerCase();
    const args = input.join(' ');
    console.info(`Called command: ${command}`);
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});
