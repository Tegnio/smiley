const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "avatar",
  description: "",
  category: "useful",
  aliases: ["ava", "av"],
  cooldown: 2,
  botPermissions: ["ATTACH_FILES"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);

    const avatar = member.user.displayAvatarURL({ format: "png", size: 2048, dynamic: true });

    const embed = BaseEmbed(message)
      .setTitle(lang.IMAGE.FAILED_TO_LOAD)
      .setURL(avatar)
      .setImage(avatar);

    message.channel.send(embed);
  },
};
