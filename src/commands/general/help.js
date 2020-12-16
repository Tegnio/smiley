const { getGuildById } = require("../../utils/functions");
const { owners } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");
const categories = require("../../data/categories.json");

module.exports = {
  name: "help",
  description: "",
  category: "general",
  cooldown: 2,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guild = await getGuildById(message.guild.id);
    const prefix = guild.prefix;
    const cmdArgs = args[0];
    const nsfw = message.channel.nsfw;

    if (categories.includes(cmdArgs)) {
      const cmds = bot.commands
        .filter((com) => com.category === cmdArgs)
        .map((cmd) => `\`${cmd.name}\``)
        .join(", ");

      const embed = BaseEmbed(message).setTitle(
        `${lang.HELP.COMMANDS}: ${cmdArgs}`
      );

      if (cmdArgs === "botowner") {
        if (owners.includes(message.author.id)) {
          embed.setDescription(cmds);
        } else {
          embed.setDescription(lang.HELP.OWNER_ONLY);
        }
      }

      if (["nsfw"].includes(cmdArgs.toLowerCase())) {
        if (nsfw) {
          embed.setDescription(cmds);
        } else {
          embed.setDescription(lang.HELP.NSFW_ONLY);
        }
      }
      return message.channel.send({ embed });
    } else if (cmdArgs) {
      const cmd =
        bot.commands.get(cmdArgs) || bot.commands.get(bot.aliases.get(cmdArgs));
      if (!cmd) return message.channel.send(lang.HELP.CMD_NOT_FOUND);

      const aliases = cmd.aliases
        ? cmd.aliases.map((alias) => alias)
        : lang.GLOBAL.NONE;
      const cooldown = cmd.cooldown ? `${cmd.cooldown} ${lang.TIME.SECONDS}` : lang.GLOBAL.NONE;
      const memberPerms = !cmd.memberPermissions
        ? lang.GLOBAL.NONE
        : [...cmd.memberPermissions].map((p) => p);
      const botPerms = !cmd.botPermissions
        ? ["SEND_MESSAGES"].map((p) => p)
        : [...cmd.botPermissions, "SEND_MESSAGES"].map((p) => p);

      const embed = BaseEmbed(message)
        .setTitle(`\`${cmd.name}\``)
        .setDescription(lang.HELP.DESCRIPTION, `${lang.DESCRIPTION.toCapitalize(cmd.name)} || ${lang.GLOBAL.NOT_SPECIFIED}`)
        .addField(lang.HELP.CATEGORY, lang.HELP.toCapitalize(cmd.category), true)
        .addField(lang.HELP.ALIASES, aliases, true)
        .addField(lang.HELP.COOLDOWN, cooldown, true)
        .addField(lang.HELP.USAGE, `${prefix}${lang.USAGE.toCapitalize(cmd.name)} || ${lang.GLOBAL.NOT_SPECIFIED}`)
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
      .addField(lang.HELP.FUN, funCmds);
    if (nsfw) {
      embed.addField(lang.HELP.NSFW, nsfwCmds);
    } else {
      embed.addField(lang.HELP.NSFW, lang.HELP.NSFW_ONLY);
    }
    embed
      .addField(lang.HELP.USEFUL, usefulCmds)
      .addField(lang.HELP.SETTINGS, settingsCmds)
      .setDescription(lang.HELP.HELP_DESC.replace("{prefix}", prefix))
      .setTitle(lang.HELP.HELP);

    message.channel.send(embed);
  },
};
