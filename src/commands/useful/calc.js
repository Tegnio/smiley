const math = require("mathjs");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "calc",
  description: "",
  category: "useful",
  aliases: ["math"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    try {
      const calculation = math.evaluate(args.join(" "));

      if(!calculation) {
        return message.channel.send(lang.GLOBAL.PROVIDE_ARGS)
      }

      const embed = BaseEmbed(message)
        .setTitle(lang.OTHER.CALC)
        .addField(
          `${lang.OTHER.EVAL_INPUT}:`,
          `\`\`\`js\n${args.join(" ")}\`\`\``
        )
        .addField(
          `${lang.OTHER.EVAL_OUTPUT}:`,
          `\`\`\`js\n${calculation}\`\`\``
        );

      message.channel.send(embed);
    } catch (e) {
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  },
};
