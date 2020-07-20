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
  if (!message.content.toLowerCase().startsWith(vars.prefix) || message.author.bot) return;
  if (vars.restrict && message.channel != sender.channel) {
    message.channel.send('Keep skribbl commands to <#' + sender.channel.id + '>')
      .then(message => {message.delete({timeout: 5000})});
    return
  }
  const args = message.content.slice(vars.prefix.length).trim().replace(/,/g, '' ).split(' ');
  const command = args.shift().toLowerCase();
  switch(command){
      case 'add':
        list = list.concat(args)
        sender.send('<@' + message.author.id + '> added \"' + args + '\"');
        message.delete({timeout: 5000})
        update()
        break;
      case 'remove':;
        var notFound = [],
            removed  = []
        args.forEach((item, i) =>	{
        			const index = list.indexOf(item)
        			if (index === -1) {notFound.push(item)}
        			else {
                list.splice(index, 1)
                removed.push(item)
        			}
            });
        if (notFound.length != 0) {sender.send(notFound + ' not found')}
        sender.send('<@' + message.author.id + '> removed \"' + removed + '\"');
        message.delete({timeout: 5000})
        update()
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
        update()
        message.delete({timeout: 5000})
        break;
  }
});

function update() {
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
