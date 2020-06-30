const Discord = require('discord.js');
require('dotenv').config();
const jsonfile = require('jsonfile')
var url = require('url');

const client = new Discord.Client();

var hookURL = process.env.hook
var hookVar = url.parse(hookURL).path.split('/');
var hook

client.on('ready', () => {
  console.log(client.user.username, 'ready')
  client.fetchWebhook(hookVar[3], hookVar[4]).then(webhook => {
    hook = webhook;
    console.log(hook.name, 'ready');
  })
});

var prefix = 's!'
var list = []
jsonfile.readFile('list.json', function (err, obj) {
  if (err) console.error(err)
  list = obj
  console.log(list);
})
var lastMSG
jsonfile.readFile('lastMSG.json', function (err, obj) {
  if (err) console.error(err)
  lastMSG = obj
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const command = message.content.slice(prefix.length).split(' ').shift().toLowerCase();
  switch(command){
      case 'add':
        const add = message.content.slice('s!add'.length).trim().split(', ');
        list = list.concat(add)
        hook.send('added', {username:'Skribbl.io'});
        update(message.channel)
        break;
      case 'remove':
        const remove = message.content.slice('s!remove'.length).trim().split(', ');
        remove.forEach((item, i) =>	{
        			const index = list.indexOf(item)
              console.log(index);
              console.log(list);
        			if (index === -1) {message.channel.send(item + ' not found')}
        			else {
                list.splice(index, 1)
                hook.send(item + ' removed', {username:'Skribbl.io'});
        			}
            });
        update(message.channel)
        break;
      case 'help':
        var lines = [
          'prefix: ' + prefix,
          '\`' + prefix + 'list   \` displays the list',
          '\`' + prefix + 'add    \` adds a word or list to the list',
          '\`' + prefix + 'remove \` removes a word or list from the list',
          '\`' + prefix + 'help   \` shows this list'
        ]
        hook.send(lines.join('\n'), {username:'Skribbl.io'});
        break;
      case 'list':
        update(message.channel)
        break;
  }
});

function update(channel) {
  if (lastMSG) {
    channel.messages.delete(lastMSG)
  }
  hook.send(list.join(', '), {username:'Skribbl.io', split:{char:',', append: ','}})
  .then(message => {
    lastMSG = message.id
    jsonfile.writeFile('./lastMSG.json', lastMSG)
  })
  jsonfile.writeFile('./list.json', list)
}

client.login(process.env.Discord);
