# PoliEdro-Telegram-bot

[![Build Status](https://telegram.org/file/464001916/10d69/wMJtQWE_ZwI.17701.png/f4e97997cb38fc577a)](https://t.me/PoliEdroAdminBot)

🏳️‍🌈 The PoliEdro Telegram Bot based on telegraf.js and node.js

## Functionalities

It features the following functionalities:

- 🗞 Send latest announced events 🗞
- 👥 Join into the group [wip]

## How to use

Functionalities are triggered by:

- ⚡️ automations, which are triggered by events
- ⌨️ commands, which are prefixed by `/`

## Send latest events 🗞

Send latest events is possible thanks to the latest events published on our [Telegram channel](https://t.me/PoliEdroLive)

The feature is responsible to send a summary with the next event pending poster and the dates of the next events.

To trigger this there is:

- Automation:
  - that instantly sends the summary when a new message has been sent in our [Telegram channel](https://t.me/PoliEdroLive)
- Command:
  - `/events` that sends the summary
