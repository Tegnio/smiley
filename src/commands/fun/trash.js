const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "trash",
  description: "",
  category: "fun",
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png" });
    const data = `https://api.no-api-key.com/api/v2/trash?image=${image}`;

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data)
    .setImage(data);

    message.channel.startTyping()
    .then(() => message.channel.send(embed))
    .then(() => message.channel.stopTyping(true));
  },
};
