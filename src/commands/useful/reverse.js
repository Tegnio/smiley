const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "reverse",
  category: "useful",
  aliases: ["rev", "rv"],
  cooldown: 2,
  botPermissions: ["EMBED_LINKS"],
  async execute(bot, message, args) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const text = args.join(" ");
    const reversed = text.split("").reverse().join("");

    if (!text) {
      return message.reply(lang.GLOBAL.PROVIDE_ARGS)
    }
    if (text.length > 2048) {
      return message.reply(lang.OTHER.ARGS_LENGTH_LIMIT
      .replace("{max}", "2048")
      .replace("{got}", text.length))
    }

    const embed = BaseEmbed(message)
    .setDescription(reversed)

    message.channel.stopTyping(true);
    message.channel.send(embed);
  },
};
