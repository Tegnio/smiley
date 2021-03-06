module.exports = {
  name: "stop",
  category: "music",
  aliases: ["leave", "dc", "disconnect"],
  cooldown: 2,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const queue = await bot.player.getQueue(message);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!bot.player.isPlaying(message)) {
      return message.channel.send(lang.MUSIC.EMPTY_QUEUE);
    }

    if (!queue) {
      return message.channel.send(lang.MUSIC.EMPTY_QUEUE);
    }

    bot.player.stop(message);
    message.channel.send(lang.MUSIC.STOPPED);
  },
};
