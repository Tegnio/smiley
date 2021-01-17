const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "color",
  category: "useful",
  cooldown: 2,
  aliases: ["clr"],
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  async execute(bot, message, args) {
    message.channel.startTyping();
    const lang = await bot.getGuildLang(message.guild.id);
    const rcolor = Math.floor(Math.random()*16777215).toString(16);
    const url = `https://some-random-api.ml/canvas/colorviewer?hex=`;
    const color = args[0];

    if(!color) {
      const embed = BaseEmbed(message)
      .setColor(rcolor)
      .setThumbnail(url + rcolor)
      .setTitle(`#${rcolor}`);

      message.channel.stopTyping(true);
      message.channel.send(embed);
    } else if(color.length > 6) {
        return message.channel.send(lang.GLOBAL.LONG_ARGS
          .replace("{length}", color.length)
          .replace("{limit}", "6"));
    } else {
        const embed = BaseEmbed(message)
        .setColor(color)
        .setThumbnail(url + color)
        .setTitle(`#${color}`);

        message.channel.stopTyping(true);
        message.channel.send(embed);;
    };
  },
};
