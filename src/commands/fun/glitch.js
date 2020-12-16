const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "glitch",
  description: "",
  category: "fun",
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);
    const image = member.user.displayAvatarURL({ size: 512, format: "png", dynamic: true});
    const wait_msg = await message.channel.send(lang.OTHER.PROCESSING);
    const data = await fetch(`https://useless-api--vierofernando.repl.co/glitch?image=${image}`).then((res) =>
      res.json()
    );

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