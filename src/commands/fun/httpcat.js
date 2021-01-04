const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "httpcat",
  description: "",
  category: "fun",
  aliases: ["hc"],
  cooldown: 2,
  usage: "httpcat <100-599>",
  botPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
  memberPermissions: [],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const status = args[0];
    const image = `https://http.cat/${status}`;

    if (!status) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS)
    }

    const wait_msg = await message.channel.send(lang.OTHER.PROCESSING);

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(image)
    .setImage(image);

    setTimeout(() => {
      message.channel.send(embed);
      wait_msg.delete();
    }, 100);
  },
};
