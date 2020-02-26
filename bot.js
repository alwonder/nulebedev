require('dotenv').config();
const Telegraf = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

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
});

bot.catch((error) => {
    console.error(error);
});

bot.startPolling();
