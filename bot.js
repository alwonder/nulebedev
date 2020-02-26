require('dotenv').config();
const Telegraf = require('telegraf');
const rp = require('request-promise');
const HttpsProxyAgent = require('https-proxy-agent');
const fs = require('fs');

const socksOptions = {
    host: '67.205.174.209',
    port: '1080',
    // key: 'eefb175d6d7f820cdc73ab11edbdcdbd747777772e676f6f676c652e636f6d'
    // auth: '772114:LHNHr5FX', // Если прокси приватный, если нет, то удаляйте строчку
};

const proxyAgent = new HttpsProxyAgent(socksOptions);

const umer = fs.readFileSync('./umer.jpg');

const bot = new Telegraf(
    process.env.BOT_TOKEN,
    {
        // telegram: {
        //     agent: proxyAgent,
        // },
    },
);

const ends = [
    'ли',
    'ла',
    'ло',
    'ил',
    'ел',
    'ёл',
    'ал',
    'ял',
    'ит',
    'ет',
    'ёт',
    'ят',
    'ут',
    'ют',
    'тся',
    'ись',
    'лся',
    'лись',
    'лась',
    'лось',
    'мер',
    'ёр',
    'дор',
    'доры',
    'дорасы',
    'дарасы',
    'уй',
    'да',
];

const regex = new RegExp(`(${ends.join('|')})$`);

bot.start((ctx) => {
    console.log('Started', ctx.from.id);
    // return ctx.reply('Heya!');
});

bot.on('text', (ctx) => {
    const words = ctx.message.text
        .match(/[а-я]+/ig)
        .map(word => word.toLowerCase())
        .filter(word => regex.test(word));
    if (words.length === 0) return;

    const randomWord = words[Math.floor(Math.random() * words.length)];

    ctx.replyWithPhoto({
        source: './umer.jpg',
        
    }, {
        caption: `Ну ${randomWord} и ${randomWord}`,
    });
    // `Ну ${randomWord} и ${randomWord}`
});

bot.catch((error) => {
    console.error(error);
});

bot.startPolling();
