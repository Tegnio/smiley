const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "magik",
  description: "",
  category: "fun",
  aliases: ["magic"],
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png" });
    const wait_msg = await message.channel.send(lang.OTHER.PROCESSING);
    const intensity = Math.floor(Math.random() * 9 + 1)
    const data = await fetch(`https://nekobot.xyz/api/imagegen?type=magik&image=${image}&intensity=${intensity}`)
      .then((res) => res.json());

    const embed = BaseEmbed(message)
    .setTitle(lang.IMAGE.FAILED_TO_LOAD)
    .setURL(data.message)
    .setImage(data.message);

    setTimeout(() => {
      message.channel.send(embed);
      wait_msg.delete();
    }, 100);
  },
};
