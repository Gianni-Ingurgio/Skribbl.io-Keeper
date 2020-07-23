# ![logo](https://skribbl.io/res/favicon.png) Skribbl.io list keeper
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
- Token is a Discord bot token <details> <summary>How to set up a bot</summary>
  1. Go to the [Discord developer portal](https://discord.com/developers/applications)
  1. Create a new application with the ![New Application](https://img.shields.io/badge/-New%20Application-7289da) button in the top right
  1. Give it a name
  1. Click on your new application and go to the Bot tab
  1. Copy the token shown under the username
  1. Feel free to set whatever picture and username you want
- You only have to set up the mode you choose
  -  Basic mode speaks directly through the bot user <Details> <summary>How to get IDs</summary>
    1. Enable developer mode under Discord "Appearance" settings
    1. Right click on your server and channel and click "copy ID"
  - Hook mode speaks allows you to set a separate icon and name from the bot user <Details> <summary>How to set up a webhook</summary>
    1. Right click channel, click "Edit channel," then "Integrations," then "Webhooks"
    1. Create a new webhook with the ![New Webhook](https://img.shields.io/badge/-New%20Webhook-7289da) button in the top
    1. Set the name and avatar you want the bot to talk through (The skribbl logo is at the top of this file)
    1. Copy the webhook URL
    1. discordapp.com/api/webhooks/<u>\*\*\*Webhook ID\*\*\*</u>/<u>\*\*\*\*\*\*\*\*\*\*Webhook Token\*\*\*\*\*\*\*\*\*\*</u>
    1. Paste the ID and token into their respective variables
- Restrict prevents commands from running outside the channel set above
- Prefix is a lowercase string

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
#### I am not associated with Skribbl.io or any of its affiliates
