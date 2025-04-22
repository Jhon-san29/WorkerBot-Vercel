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
    const msg = req.body.message;
    if (!msg) return res.status(200).send('No message');

    console.log('Received message:', msg); // Debug log

    for (const channel of CHANNELS) {
      try {
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
        console.log(`Sent to ${channel}`);
      } catch (error) {
        console.error(`Error sending to ${channel}:`, error);
      }
    }

    return res.status(200).send('OK');
  }

  return res.status(200).send('WorkerBot is running.');
};
