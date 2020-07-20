# Skribbl.io list keeper
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square)](https://github.com/Gianni-Ingurgio/Skribbl.io-Keeper/graphs/commit-activity) [![Issues](https://img.shields.io/github/issues/Gianni-Ingurgio/Skribbl.io-Keeper?style=flat-square)](https://github.com/Gianni-Ingurgio/Skribbl.io-Keeper/issues) [![HitCount](http://hits.dwyl.com/Gianni-Ingurgio/Skribbl.io-Keeper.svg)](http://hits.dwyl.com/Gianni-Ingurgio/Skribbl.io-Keeper) [![License: MIT](https://img.shields.io/badge/License-MIT-A31F34.svg?style=flat-square)](./LICENSE.md) [![Discord.js](https://img.shields.io/badge/-Discord.js-7289da?logo=discord&logoColor=white&style=flat-square)](https://discord.js.org/) [![Discord](https://discordapp.com/api/guilds/686681540062740490/widget.png)](https://discord.gg/mHZ3Txf)

## Usage
- [x] Users can add to the list with the add command
- [x] Users can remove from the list with the remove command
- [x] Users can refresh the list with the list command
- [x] Users can use the help command
- [x] All add & removes are logged by the bot
- [x] All user commands are deleted after 5 seconds
- [x] All data is stored in a data.json file

## Installation
1. Clone or download wherever you want it
2. Install dependencies with `npm i`
3. Set variables
4. Run with `node .`

## Variables
Create a variables.json file using variables.json.template
- Token is your bot token
  1. Go to the [Discord developer portal](https://discord.com/developers/applications)
  2. Create a new application with the ![New Application](https://img.shields.io/badge/-New%20Application-7289da) button in the top right
  3. Give it a name
  4. Click on your new application and go to the Bot tab
  5. Copy the token shown under the username
  6. Feel free to set whatever picture and username you want
- Mode can be either hook or basic
  - hook sends messages through a webhook
  - basic sends messages directly through the bot user
- You only have to set the variables for the mode you choose to use
- Basic requires a server (a.k.a. "guild") and a channel ID
  - To get IDs, enable developer mode under Discord "Appearance" settings
  - Just right click on your server and channel and click "copy ID"
- Hook requires a webhook to be created in the channel you want to keep the list in
  - Right click channel, click "Edit channel," then click "webhooks"
  - Create a new application with the ![Create Webhook](https://img.shields.io/badge/-Create%20Webhook-7289da) button in the top right
  - Set the name and avatar you want the bot to talk through (The skribbl logo is ![logo](https://skribbl.io/res/favicon.png))
  - Copy the webhook URL
  - discordapp.com/api/webhooks/<u>\*\*\*Webhook ID\*\*\*</u>/<u>\*\*\*\*\*\*\*\*\*\*Webhook Token\*\*\*\*\*\*\*\*\*\*</u>
- Restrict prevents users from using commands outside of the channel the bot speaks through
- Prefix must be lowercase
  - This allows it to be case insensitive for users

```json
{
  "token"     : "bot token",
  "mode"      : "hook or basic",
  "basic"     : {
    "guild"   : "server id",
    "channel" : "channel id"
  },
  "hook"      : {
    "id"      : "webhook id",
    "token"   : "webhook token"
  },
  "restrict"  : false,
  "prefix"    : "set a prefix"
}
```
