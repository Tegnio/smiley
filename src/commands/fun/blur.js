const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "blur",
  description: "",
  category: "fun",
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png", dynamic: true });
    const wait_msg = await message.channel.send(lang.OTHER.PROCESSING);
    const data = `https://some-random-api.ml/canvas/blur?&avatar=${image}`;

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data)
    .setImage(data);

    setTimeout(() => {
      message.channel.send(embed);
      wait_msg.delete();
    }, 100);
  },
};
