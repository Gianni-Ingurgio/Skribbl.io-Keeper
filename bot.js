const
  Discord = require('discord.js'),
  vars = require('./variables.json'),
  jsonfile = require('jsonfile'),
  client = new Discord.Client()

var sender

client.on('ready', () => {
  if (vars.mode === "hook") {
    client.fetchWebhook(vars.hook.id, vars.hook.token).then(webhook => {
      sender = webhook;
      sender.channel = client.guilds.resolve(sender.guildID).channels.resolve(sender.channelID)
      console.table({'bot' : client.user.username, 'webhook' : sender.name, 'restriction': (vars.restrict) ? sender.channel.name : 'disabled', 'prefix' : vars.prefix})
    })
  }
  if (vars.mode === "basic") {
    sender = client.guilds.resolve(vars.basic.guild).channels.resolve(vars.basic.channel)
    sender.channel = sender
  }
})

var data
jsonfile.readFile('data.json', function (err, obj) {
  if (err) console.error(err)
  list = obj.list
  lastMSG = obj.lastMSG
})

client.on('message', message => {
  const command = message.content.slice(prefix.length).split(' ').shift().toLowerCase();
  if (!message.content.toLowerCase().startsWith(vars.prefix) || message.author.bot) return;
  if (vars.restrict && message.channel != sender.channel) {
    message.channel.send('Keep skribbl commands to <#' + sender.channel.id + '>')
      .then(message => {message.delete({timeout: 5000})});
    return
  }
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
        var commands = [
          vars.prefix + 'list',
          vars.prefix + 'add',
          vars.prefix + 'remove',
          vars.prefix + 'help'
        ]
        var helpText = [
          'displays the list',
          'adds a word or list to the list',
          'removes a word or list from the list',
          'shows this menu'
        ]
        const embed = new Discord.MessageEmbed({
              title: "Skribbl.io",
              description: "This bot stores a custom word list for skribbl.io",
              thumbnail: {url: "https://skribbl.io/res/favicon.png"},
              fields: [{
                  name: "Prefix: " + vars.prefix,
                  value: commands.join('\n'),
                  inline: true
                }, {
                  name: "-----------------------------------------",
                  value: helpText.join('\n'),
                  inline: true
                }],
              footer: {
                icon_url: 'https://www.iconsdb.com/icons/preview/color/7289DA/bomb-2-xl.png',
                text: "This message self destructs for cleanliness"
              }
            })
        sender.send(embed).then(message => {message.delete({timeout: 30000})})
        message.delete({timeout: 30000})
        break;
      case 'list':
        update(message.channel)
        break;
  }
});

function update(channel) {
  lastMSG.forEach((msg) => {
    sender.channel.messages.delete(msg);
  })
  sender.send(list.join(', '), {split:{char:',', append: ','}})
  .then(message => {
    lastMSG = []
    message.forEach((msg) => {lastMSG.push(msg.id)});
    jsonfile.writeFile('./data.json',{"lastMSG" : lastMSG, "list" : list})
  })
}

client.login(vars.token);
