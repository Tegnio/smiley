const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "clyde",
  description: "",
  category: "image",
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const text = args.join(" ");
    if(!text) return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    if(text.length > 64) {
      return message.channel.send(lang.GLOBAL.LONG_ARGS
      .replace("{length}", text.length)
      .replace("{limit}", "64"));
    }

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=clyde&text=${encodeURIComponent(text)}`
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setTitle(lang.IMAGE.FAILED_TO_LOAD)
      .setURL(data.message)
      .setImage(data.message);

    message.channel.startTyping()
    .then(() => message.channel.send(embed))
    .then(() => message.channel.stopTyping(true));
  },
};
