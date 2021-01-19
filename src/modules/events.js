const Logger = require("./Logger");
const glob = require("glob");
const types = ["client", "guild", "message", "player"];

module.exports = function loadEvents(bot) {
  const eventFiles = glob.sync("./src/events/**/*.js");

  eventFiles.forEach((file) => {
    const event = require(`../../${file}`);
    let type = "Bot";

    types.forEach((t) => {
      if (file.includes(t)) {
        type = t;
      }
    });

    if (!event.execute) {
      throw Logger.error("events", `execute function is required for events! (${file})`);
    }

    if (!event.name) {
      throw Logger.error("events", `Name is required for events! (${file})`);
    }

    if (type === "player") {
      bot.player.on(event.name, event.execute.bind(null, bot));
    } else {
      bot.on(event.name, event.execute.bind(null, bot));
    }

    delete require.cache[require.resolve(`../../${file}`)];

    // Logger.log("events", `Loaded ${bot.toCapitalize(type)}: ${event.name}`);
  });
};
