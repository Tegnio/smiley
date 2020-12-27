const math = require("math-expression-evaluator");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "calc",
  description: "",
  category: "useful",
  aliases: ["math"],
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const sum = args[0];
    try {
      const calculation = math.eval(sum);

      const embed = BaseEmbed(message)
        .setTitle(lang.OTHER.CALC)
        .addField(
          `${lang.OTHER.EVAL_INPUT}:`,
          `\`\`\`js\n${sum}\`\`\``
        )
        .addField(
          `${lang.OTHER.EVAL_OUTPUT}:`,
          `\`\`\`js\n${calculation}\`\`\``
        );

      message.channel.send(embed);
    } catch (e) {
      return message.channel.send(lang.OTHER.CALC_ERR);
    }
  },
};
