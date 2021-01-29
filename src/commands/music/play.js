const Logger = require("../../modules/Logger");

module.exports = {
  name: "play",
  category: "music",
  aliases: ["p"],
  cooldown: 2,
  botPermissions: ["EMBED_LINKS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const voiceChannel = message.member.voice.channel;
    const search = args.join(" ");

    if (!search) {
      return message.channel.send(lang.MUSIC.PROVIDE_SEARCH);
    }

    if (!voiceChannel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    try {
      await bot.player.play(message, search, true);
    } catch (e) {
      Logger.error("PLAY", e?.stack || e);
    }
  },
};
