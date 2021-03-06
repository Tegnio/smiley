const math = require("mathjs");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "calc",
  category: "useful",
  aliases: ["math"],
  cooldown: 2,
  botPermissions: ["EMBED_LINKS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const sum = args.join(" ");
    try {
      if (!sum) {
        return message.channel.send(lang.GLOBAL.PROVIDE_ARGS)
      }

      message.channel.startTyping();
      const calculation = math.evaluate(sum
          .replace(/[x]/gi, "*")
          .replace(/[×]/gi, "*")
          .replace(/[,]/g, ".")
          .replace(/[÷]/gi, "/")
          .replace(/[:]/gi, "/")
      );

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

        message.channel.stopTyping(true);
        message.channel.send(embed);
      } catch (e) {
      return message.channel.send(lang.OTHER.CALC_ERR);
    }
  },
};
