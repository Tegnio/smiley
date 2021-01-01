const User = require("../models/User.model");
const Guild = require("../models/Guild.model");
const BaseEmbed = require("../modules/BaseEmbed");
const moment = require("moment");
const Logger = require("../modules/Logger");
// eslint-disable-next-line no-unused-vars
const { Message, Client } = require("discord.js");
const { errorLogsChannelId } = require("../../config.json");

/**
 *
 * @param {string} userId
 * @param {string} guildId
 * @returns {{
 * user: {
 *  user_id: string;
 *  guild_id: string;
 * }
 */
async function getUserById(userId, guildId) {
  try {
    let user = await User.findOne({ user_id: userId, guild_id: guildId });

    if (!user) {
      user = await addUser(userId, guildId);
    }

    return {
      user,
    };
  } catch (e) {
    console.error(e);
  }
}

/**
 * Add a user to the database
 * @param {string} userId
 * @param {string} guildId
 */
async function addUser(userId, guildId) {
  try {
    const user = new User({ user_id: userId, guild_id: guildId });

    await user.save();

    return user;
  } catch (e) {
    console.error(e);
  }
}

/**
 * Updates user information
 * @param {string} userId Id of the user
 * @param {string} guildId Id of the guild
 * @param {object} data updated data object
 */
async function updateUserById(userId, guildId, data) {
  try {
    if (typeof data !== "object") {
      throw Error("'data' must be an object");
    }

    const user = await getUserById(userId, guildId);

    if (!user) {
      await addUser(guildId);
    }

    await User.findOneAndUpdate({ user_id: userId, guild_id: guildId }, data);
  } catch (e) {
    console.error(e);
  }
}

/**
 *
 * @param {string} userId
 * @param {string} guildId
 */
async function removeUser(userId, guildId) {
  try {
    await User.findOneAndDelete({ user_id: userId, guild_id: guildId });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {string} guildId
 */
async function getGuildById(guildId) {
  try {
    let guild = await Guild.findOne({ guild_id: guildId });

    if (!guild) {
      guild = await addGuild(guildId);
    }

    return guild;
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {string} guildId
 * @param {object} settings
 */
async function updateGuildById(guildId, settings) {
  try {
    if (typeof settings !== "object") {
      throw Error("'settings' must be an object");
    }

    // check if guild exists
    const guild = await getGuildById(guildId);

    if (!guild) {
      await addGuild(guildId);
    }

    await Guild.findOneAndUpdate({ guild_id: guildId }, settings);
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {string} guildId
 */
async function addGuild(guildId) {
  try {
    const guild = new Guild({ guild_id: guildId });

    await guild.save();

    return guild;
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {string} guildId
 */
async function removeGuild(guildId) {
  try {
    await Guild.findOneAndDelete({ guild_id: guildId });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {Message} message
 * @param {string[]} args
 * @param {Boolean} allowAuthor
 */
function findMember(message, args, allowAuthor) {
  return message.guild.member(
    message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((m) => m.user.id === args[0]) ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
      (allowAuthor === true ? message.member : null)
  );
}

/**
 * @param {string} guildId
 * @returns {Object} The found language
 */
async function getGuildLang(guildId) {
  try {
    const guild = await getGuildById(guildId);

    return require(`../locales/${guild?.locale || "en"}`);
  } catch (e) {
    console.error(e);
  }
}

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {"error"} type
 * @param {?string} msgContent
 */
function sendErrorLog(bot, error, type, msgContent) {
  if (!errorLogsChannelId) {
    Logger.error("UNHANDLED ERROR", error);
  }

  const message = {
    author: bot.user,
  };

  const name = error.name || "N/A";
  const code = error.code || "N/A";
  const httpStatus = error.httpStatus || "N/A";
  const stack = error.stack || "N/A";
  const content = msgContent || "N/A";

  console.log(error);

  const embed = BaseEmbed(message)
    .setTitle("An error occurred")
    .addField("Name", name, true)
    .addField("Code", code, true)
    .addField("httpStatus", httpStatus, true)
    .addField("Timestamp", Logger.fullDate(), true)
    .addField("Command executed", content)
    .setDescription(`\`\`\`${stack}\`\`\` `)
    .setColor(type === "error" ? "RED" : "ORANGE");

  bot.channels.cache.get(errorLogsChannelId)?.send('<@!515551959311450123>', embed);
}

/**
 * @param {number | string} date
 * @returns {string}
 */
const formatDate = (date) => moment(date).format("DD.MM.YYYY, HH:mm:ss");

/**
 * @param {string} str
 * @returns {string}
 */
const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = {
  sendErrorLog,
  formatDate,
  toCapitalize,
  getUserById,
  addGuild,
  addUser,
  removeUser,
  updateUserById,
  getGuildById,
  updateGuildById,
  removeGuild,
  findMember,
  getGuildLang,
};
