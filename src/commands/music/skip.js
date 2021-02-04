module.exports = {
  name: "skip",
  category: "music",
  aliases: ["s"],
  cooldown: 2,
  botPermissions: ["USE_EXTERNAL_EMOJIS"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!bot.player.isPlaying(message)) {
      return message.channel.send(lang.MUSIC.EMPTY_QUEUE);
    }

    const queue = await bot.player.getQueue(message);
    if (!queue) {
      return message.channel.send(lang.MUSIC.EMPTY_QUEUE);
    }
    if (queue.tracks.length === 1) {
      return message.channel.send(lang.MUSIC.TRACK_CANNOT_BE_SKIPPED);
    }

    const track = bot.player.nowPlaying(message);
    message.channel.send(lang.MUSIC.SKIPPING.replace("{track}", track.title));
    bot.player.skip(message);
  },
};
