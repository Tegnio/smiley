const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "nowplaying",
  category: "music",
  aliases: ["np", "current"],
  cooldown: 2,
  botPermissions: ["EMBED_LINKS"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const playing = bot.player.isPlaying(message);
    const queue = await bot.player.getQueue(message);

        if (!playing) {
          return message.channel.send(lang.MUSIC.EMPTY_QUEUE);
        }
        if (!queue) {
          return message.channel.send(lang.MUSIC.EMPTY_QUEUE);
        }

        const track = bot.player.nowPlaying(message);
        const progressBar = bot.player.createProgressBar(message, {
          timecodes: true,
        });
        const volume = bot.player.queues.get(message.guild.id).volume;

        const embed = BaseEmbed(message)
        .setAuthor(lang.MUSIC.NOW_PLAYING)
        .setTitle(track.title)
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .addField(lang.OTHER.REQUESTED_BY, track.requestedBy.tag, true)
        .addField(lang.MUSIC.UPLOADED_BY, track.author, true)
        .addField(lang.MUSIC.VOLUME, `${volume} %`, true)
        .addField(lang.MUSIC.PLAYBACK_PROGESS, progressBar);

    message.channel.send(embed);
  },
};
