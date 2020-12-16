const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "avatar",
  description: "",
  category: "util",
  cooldown: 5,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);

    const avatar = member.user.displayAvatarURL({ format: "png", size: 4096, dynamic: true });

    const embed = BaseEmbed(message)
      .setTitle(lang.IMAGE.FAILED_TO_LOAD)
      .setDescription(avatar)
      .setImage(avatar);

    message.channel.send(embed);
  },
};
