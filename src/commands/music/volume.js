const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "volume",
  category: "music",
  aliases: ["vol"],
  cooldown: 2,
  botPermissions: ["ADD_REACTIONS"],
  async execute(bot, message, args) {
    const [newVol] = args;
    const lang = await bot.getGuildLang(message.guild.id);
    const queue = await bot.player.getQueue(message);
    if (!message.member.voice.channel) {
      return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
    }

    if (!bot.player.isPlaying(message) || !queue) {
      return message.channel.send(lang.MUSIC.EMPTY_QUEUE);
    }

    if (isNaN(newVol)) {
      return message.channel.send(lang.OTHER.MUST_BE_A_NUMBER
        .replace("{args}", newVol));
    }

    if (Number(newVol) < 0) {
      return message.channel.send(lang.OTHER.ARGS_VALUE_MIN
      .replace("{min}", "0")
      .replace("{got}", newVol));
    }

    if (Number(newVol) > 150) {
      return message.channel.send(lang.OTHER.ARGS_VALUE_MAX
      .replace("{max}", "150")
      .replace("{got}", newVol));
    }

    if (!newVol) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    bot.player.setVolume(message, newVol);
    message.react("✅");
  },
};
