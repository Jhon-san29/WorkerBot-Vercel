const TelegramBot = require('node-telegram-bot-api');

const botToken = process.env.TOKEN;
const bot = new TelegramBot(botToken);

const CHANNELS = [
  '@shalplaychina',
  '@shalplaykorea',
  '@shalplaymovie'
];

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const body = req.body;

    if (body.message && body.message.text) {
      const msg = body.message;

      for (const channel of CHANNELS) {
        await bot.sendMessage(channel, msg.text);
      }
    }

    return res.status(200).send('OK');
  }

  return res.status(200).send('WorkerBot is running.');
};
