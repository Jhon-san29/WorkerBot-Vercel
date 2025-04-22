# WorkerBot

A Telegram bot hosted on Vercel that forwards incoming messages to 3 channels.

## Setup

1. Create a `.env` file and add your bot token:

```
TOKEN=your_bot_token
```

2. Deploy to Vercel.

3. Set your webhook:

```
curl -F "url=https://<your-vercel-app>.vercel.app/api/bot" https://api.telegram.org/bot<your-bot-token>/setWebhook
```
