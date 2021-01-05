const { getGuildById } = require("../../utils/functions");
const { owners } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");
const categories = require("../../data/categories.json");

module.exports = {
  name: "help",
  description: "",
  category: "general",
  aliases: ["h"],
  cooldown: 2,
  botPermissions: ["EMBED_LINKS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guild = await getGuildById(message.guild.id);
    const prefix = guild.prefix;
    const cmdArgs = args[0];
    const nsfw = message.channel.nsfw;

    if (cmdArgs) {
      const cmd =
        bot.commands.get(cmdArgs) || bot.commands.get(bot.aliases.get(cmdArgs));
      if (!cmd) return message.channel.send(lang.HELP.CMD_NOT_FOUND);

      const description = cmd.description ? cmd.description : lang.GLOBAL.NOT_SPECIFIED;
      const aliases = cmd.aliases
        ? cmd.aliases.map((alias) => alias)
        : lang.GLOBAL.NONE;
      const cooldown = cmd.cooldown ? `${cmd.cooldown} ${lang.TIME.SECONDS}` : lang.GLOBAL.NONE;
      const usage = prefix + cmd.usage ? prefix + cmd.usage : lang.GLOBAL.NOT_SPECIFIED;
      const memberPerms = !cmd.memberPermissions
        ? ["SEND_MESSAGES"].map((p) => p)
        : [...cmd.memberPermissions, "SEND_MESSAGES"].map((p) => p);
      const botPerms = !cmd.botPermissions
        ? ["SEND_MESSAGES"].map((p) => p)
        : [...cmd.botPermissions, "SEND_MESSAGES"].map((p) => p);

      const embed = BaseEmbed(message)
        .setTitle(`\`${cmd.name}\``)
        .setDescription(`${lang.HELP.DESCRIPTION}: ${description}`)
        .addField(lang.HELP.CATEGORY, cmd.category, true)
        .addField(lang.HELP.ALIASES, aliases, true)
        .addField(lang.HELP.COOLDOWN, cooldown, true)
        .addField(lang.HELP.USAGE, usage)
        .addField(lang.HELP.BOT_PERMS, botPerms, true)
        .addField(lang.HELP.MEMBER_PERMS, memberPerms, true);

      return message.channel.send(embed);
    }

    const commands = bot.commands;

    const generalCmds = commands
      .filter(({ category }) => category === "general")
      .map(({ name }) => `\`${name}\``)
      .join(", ") || lang.GLOBAL.NOTHING;
    const funCmds = commands
      .filter(({ category }) => category === "fun")
      .map(({ name }) => `\`${name}\``)
      .join(", ") || lang.GLOBAL.NOTHING;
    const nsfwCmds = commands
      .filter(({ category }) => category === "nsfw")
      .map(({ name }) => `\`${name}\``)
      .join(", ") || lang.GLOBAL.NOTHING;
    const usefulCmds = commands
      .filter(({ category }) => category === "useful")
      .map(({ name }) => `\`${name}\``)
      .join(", ") || lang.GLOBAL.NOTHING;
    const settingsCmds = commands
      .filter(({ category }) => category === "settings")
      .map(({ name }) => `\`${name}\``)
      .join(", ") || lang.GLOBAL.NOTHING;

    const embed = BaseEmbed(message)
      .addField(lang.HELP.GENERAL, generalCmds)
      .addField(lang.HELP.FUN, funCmds)
      .addField(lang.HELP.USEFUL, usefulCmds);
    if (nsfw) {
      embed.addField(lang.HELP.NSFW, nsfwCmds);
    } else {
      embed.addField(lang.HELP.NSFW, lang.HELP.NSFW_ONLY);
    }
    embed
      .addField(lang.HELP.SETTINGS, settingsCmds)
      .setDescription(lang.HELP.HELP_DESC.replace("{prefix}", prefix))
      .setTitle(lang.HELP.HELP);

    message.channel.send(embed);
  },
};
