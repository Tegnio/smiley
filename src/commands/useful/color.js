const BaseEmbed = require("../../modules/BaseEmbed");
const { getGuildById } = require("../../utils/functions");

module.exports = {
  name: "color",
  description: "",
  category: "useful",
  cooldown: 2,
  aliases: ["clr"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const rcolor = Math.floor(Math.random()*16777215).toString(16);
    const url = `https://api.no-api-key.com/api/v2/color?hex=`;
    const color = args[0];

    if(!color) {
      const embed = BaseEmbed(message)
      .setColor(rcolor)
      .setThumbnail(url + rcolor)
      .setTitle(`#${rcolor}`);

      message.channel.send(embed);
    } else if(color.length > 6) {
        return message.channel.send(lang.GLOBAL.LONG_ARGS.replace("{limit}", "6"));
    } else {
        const embed = BaseEmbed(message)
        .setColor(color)
        .setThumbnail(url + color)
        .setTitle(`#${color}`);

      message.channel.send(embed);
    };
  },
};
