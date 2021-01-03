// eslint-disable-next-line no-unused-vars
const Logger = require("./Logger");
const glob = require("glob");

module.exports = function loadEvents(bot) {
  const eventFiles = glob.sync("./src/events/*.js");

  eventFiles.forEach((file) => {
    const event = require(`../../${file}`);

    if (!event.execute) {
      throw new TypeError(`[ERROR]: execute function is required for events! (${file})`);
    }

    if (!event.name) {
      throw new TypeError(`[ERROR]: name is required for events! (${file})`);
    }

    bot.on(event.name, event.execute.bind(null, bot));

    delete require.cache[require.resolve(`../../${file}`)];

    // debug
    Logger.log("events", `Loaded event ${event.name}`);
  });
};
