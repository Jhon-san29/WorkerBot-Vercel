const TelegramBot = require('node-telegram-bot-api');

const botToken = process.env.TOKEN;
const bot = new TelegramBot(botToken); // Assumes webhook mode already set

const CHANNELS = [
  '@shalplaychina',
  '@shalplaykorea',
  '@shalplaymovie'
];

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const msg = req.body.message;
    if (!msg) return res.status(200).send('No message');

    try {
      for (const channel of CHANNELS) {
        if (msg.photo) {
          const fileId = msg.photo[msg.photo.length - 1].file_id;
          const caption = msg.caption || '';
          await bot.sendPhoto(channel, fileId, {
            caption,
            parse_mode: 'HTML'
          });
        } else if (msg.text) {
          await bot.sendMessage(channel, msg.text, {
            parse_mode: 'HTML'
          });
        }
      }
      return res.status(200).send('OK');
    } catch (err) {
      console.error('Error forwarding message:', err);
      return res.status(500).send('Error forwarding message');
    }
  }

  return res.status(200).send('WorkerBot is running.');
};
