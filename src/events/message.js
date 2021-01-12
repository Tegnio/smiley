const {
  getGuildById,
  getUserById,
  updateUserById,
  errorEmbed,
  sendErrorLog,
} = require("../utils/functions");
const { owners } = require("../../config.json");
const BaseEmbed = require("../modules/BaseEmbed");
const Blacklist = require("../models/Blacklisted.model");
const Logger = require("../modules/Logger");

module.exports = {
  name: "message",
  async execute(bot, message) {
    if (message.channel.type === "dm") return;
    if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES"))
      return;

    const guildId = message.guild.id;
    const userId = message.author.id;
    const cooldowns = bot.cooldowns;
    const guild = await getGuildById(guildId);
    const blacklistedUsers = await Blacklist.find();
    const mentions = message.mentions.members;
    const disabledCommands = guild?.disabled_commands;
    const lang = await bot.getGuildLang(guildId);

    const ignoredChannels = guild?.ignored_channels;
    if (ignoredChannels.includes(message.channel.id)) return;

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const serverPrefix = guild.prefix;
    const prefix = new RegExp(
      `^(<@!?${bot.user.id}>|${escapeRegex(serverPrefix)})\\s*`
    );

    // Commands
    if (!prefix.test(message.content) || message.author.bot || userId === bot.user.id)
      return;


    const [, matchedPrefix] = message.content.match(prefix);
    const args = message.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.mentions.has(bot.user.id) && !command) {

      message.channel.send(`${lang.GLOBAL.SERVER_PREFIX}: \`${serverPrefix}\``);
    }

    if (blacklistedUsers) {
      const isBlacklisted = blacklistedUsers.find(
        (u) => u.user_id === message.author.id
      );

      if (isBlacklisted) {
        return message(lang.MEMBER.BLACKLISTED);
      }
    }

    try {
      const cmd =
        bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

      if (bot.commands.has(cmd?.name)) {
        const now = Date.now();
        const timestamps = cooldowns.get(cmd.name);
        const cooldownAmount = cmd.cooldown * 1000;

        if (disabledCommands !== null && disabledCommands.length > 0) {
          if (disabledCommands?.includes(cmd.name)) {
            return message.channel.send(lang.OTHER.CMD_DISABLED);
          }
        }

        if (cmd.ownerOnly && !owners.includes(message.author.id)) {
          return;
        }

        // botPermissions
        if (cmd.botPermissions) {
          const neededPermissions = [];
          cmd.botPermissions.forEach((perm) => {
            if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
              neededPermissions.push(perm);
            }
          });

          if (neededPermissions[0]) {
            return message.channel.send(lang.BOT.NEED_PERMS
              .replace("{neededPermissions}", neededPermissions
                .map((p) => `\`${p.toUpperCase()}\``)
                .join(", ")));
          }
        }

        // memberPermissions
        if (cmd.memberPermissions) {
          const neededPermissions = [];
          cmd.memberPermissions.forEach((perm) => {
            if (!message.channel.permissionsFor(message.member).has(perm)) {
              neededPermissions.push(perm);
            }
          });

          if (neededPermissions.length > 0) {
            return message.channel.send(lang.MEMBER.NEED_PERMS
              .replace("{neededPermissions}", neededPermissions
                .map((p) => `\`${p.toUpperCase()}\``)
                .join(", "))
            );
          }
        }

        if (cmd.nsfwOnly && cmd.nsfwOnly === true && !message.channel.nsfw) {
          const embed = BaseEmbed(message)
          .setTitle(lang.HELP.NSFW_ONLY)
          .setImage(`https://support.discord.com/hc/article_attachments/360007795191/2_.jpg`);

          return message.channel.send(embed);
        }

        if (timestamps.has(userId)) {
          const expTime = timestamps.get(userId) + cooldownAmount;

          if (now < expTime) {
            const timeleft = (expTime - now) / 1000;
            return message.channel.send(lang.MEMBER.COOLDOWN
              .replace("{cooldown}", timeleft.toFixed(2))
              .replace("{cmd}", cmd.name));
          }
        }

        timestamps.set(userId, now);
        setTimeout(() => timestamps.delete(userId), cooldownAmount);

        cmd.execute(bot, message, args);
      } else {
        return;
      }
    } catch (e) {
      sendErrorLog(bot, e, "error", message.content);
      const embed = BaseEmbed(message)
        .setTitle(lang.GLOBAL.ERROR)
        .setDescription(`\`\`\`js${e}\`\`\``);

      message.channel.send(embed);
    }
  },
};
