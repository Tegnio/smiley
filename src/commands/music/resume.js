module.exports = {
  name: "resume",
  category: "music",
  aliases: ["unpause"],
  cooldown: 2,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    const queue = await bot.player.getQueue(message);
    if (!bot.player.isPlaying(message)) {
      return message.channel.send(lang.MUSIC.EMPTY_QUEUE);
    }

    if (!queue) {
      return message.channel.send(lang.MUSIC.EMPTY_QUEUE);
    }

    if (!queue.paused) {
      return message.channel.send(lang.MUSIC.NOT_PAUSED);
    }

    bot.player.resume(message);

    const track = await bot.player.nowPlaying(message);
    message.channel.send(lang.MUSIC.RESUMED.replace("{track}", track.title));
  },
};
