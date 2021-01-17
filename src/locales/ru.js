module.exports = {
  GLOBAL: {
    ERROR: "Произошла непредвиденная ошибка.",
    NOTHING: "Здесь пока что ничего нет.",
    NONE: "Нет",
    NOT_SPECIFIED: "Не указано",
    NOT_AVAILABLE: "Недоступно",
    SERVER_PREFIX: "Серверный префикс",
    PROVIDE_ARGS: "Пожалуйста, предоставьте аргументы!",
    LONG_ARGS: "Предоставленные аргументы слишком длинны! ({length} > {limit})",
  },
  BOT: {
    ABOUT: "О smiley",
    GENERAL_INFO: "Основная информация",
    DEVELOPER: "Разработчик",
    PLATFORM: "Платформа",
    LATENCY: "Задержка",
    SHARDS: "Шардов",
    SERVERS: "Серверов",
    USERS: "Пользователей",
    COMMANDS: "Команд",
    USEFUL_LINKS: "Полезные ссылки",
    SUPPORT_SERVER: "Сервер поддержки",
    ADD: "Добавить к себе",
    USED_APIS: "Используемые API",
    VOTE: "Проголосуйте за меня",
    NO_PERMS: "Мне кажется, что у меня нет некоторых разрешений для нормальной работы.\nПожалуйста, выгоните и добавьте меня снова, используя эту ссылку:\n{link}",
    NEED_PERMS: "Мне необходимо больше прав для выполнения команды: {neededPermissions}",
  },
  MEMBER: {
    COOLDOWN: "Пожалуйста, подождите еще **{cooldown}** сек. перед тем, как снова использовать команду `{cmd}`.",
    BLACKLISTED: "Вы были добавлены в черный список бота.",
    NO_PERMS: "К сожалению, у вас нет необходимых для выполнения этой команды прав.",
    NEED_PERMS: "Вам необходимо больше прав для выполнения команды: {neededPermissions}",
  },
  GUILD: {
    NOT_FOUND: "Сервер не найден.",
    LEFT: "Я успешно покинул сервер **{guild}**.",
  },
  IMAGE: {
    FAILED_TO_LOAD: "Нажмите сюда, если изображение не загрузилось.",
  },
  LANG: {
    PROVIDE_LANG: "Пожалуйста, укажите язык!",
    NOT_AVAILABLE: "Этот язык недоступен. Доступные языки:",
    LIST: "Доступные языки:",
    UPDATED: "Язык успешно обновлен на **{language}**!"
  },
  TIME: {
    DAYS: "дн.",
    HOURS: "ч.",
    MINUTES: "мин.",
    SECONDS: "сек.",
    MILLISECONDS: "мс"
  },
  HELP: {
    HELP: "Список команд",
    HELP_DESC: "Используйте `{prefix}` в качестве префикса для команд.",
    NO_DESCRIPTION: "Описание отсутствует",
    GENERAL: "Основное",
    FUN: "Весёлости",
    NSFW: "NSFW",
    USEFUL: "Полезности",
    SETTINGS: "Настройки",
    NSFW_ONLY: "Этот канал не предназначен для такого контента!",
    OWNER_ONLY: "Эту команду может использовать только владелец!",
    CATEGORY: "Категория",
    ALIASES: "Алиасы",
    COOLDOWN: "Кулдаун",
    USAGE: "Использование",
    BOT_PERMS: "Права для бота",
    MEMBER_PERMS: "Права для участника",
    CMD_NOT_FOUND: "Команды **{command}** не существует!",
  },
  PERMISSIONS: {
    CREATE_INSTANT_INVITE: "Создавать приглашения",
    KICK_MEMBERS: "Выгонять участников",
    BAN_MEMBERS: "Банить участников",
    ADMINISTRATOR: "Администратор",
    MANAGE_CHANNELS: "Управлять каналами",
    MANAGE_GUILD: "Управлять серверов",
    ADD_REACTIONS: "Добавлять реакции",
    VIEW_AUDIT_LOG: "Смотреть журнал аудита",
    PRIORITY_SPEAKER: "Приоритетный режим",
    STREAM: "Демонстрировать экран",
    VIEW_CHANNEL: "Просматривать каналы",
    SEND_MESSAGES: "Отправлять сообщения",
    SEND_TTS_MESSAGES: "Отправлять TTS-сообщения",
    MANAGE_MESSAGES: "Управлять сообщениями",
    EMBED_LINKS: "Встраивать ссылки",
    ATTACH_FILES: "Прикреплять файлы",
    READ_MESSAGE_HISTORY: "Читать историю сообщений",
    MENTION_EVERYONE: "Упоминать everyone",
    USE_EXTERNAL_EMOJIS: "Использовать внешние эмодзи",
    VIEW_GUILD_INSIGHTS: "Видеть статистику сервера",
    CONNECT: "Подключаться к голосовым каналам",
    SPEAK: "Говорить в голосовых каналах",
    MUTE_MEMBERS: "Отключать микрофон участников",
    DEAFEN_MEMBERS: "Отключать звук участников",
    MOVE_MEMBERS: "Перемещать участников",
    USE_VAD: "Использовать активацию по голосу",
    CHANGE_NICKNAME: "Изменять никнейм",
    MANAGE_NICKNAMES: "Управлять никнеймами",
    MANAGE_ROLES: "Управлять ролями",
    MANAGE_WEBHOOKS: "Управлять вебхуками",
    MANAGE_EMOJIS: "Управлять эмодзи",
  },
  DESCRIPTIONS: {
    HELP: "Показывает все команды или информацию о конкретной команде",
  },
  OTHER: {
    GOOGLE_SEARCH: "Google Поиск",
    PREFIX_UPDATE: "Используйте `{cmd}` для установки нового префикса",
    PROCESSING: "Ваш запрос обрабатывается, подождите...",
    EVAL: "Выполнение кода",
    EVAL_TYPE: "Тип",
    EVAL_INPUT: "Ввод",
    EVAL_OUTPUT: "Вывод",
    GH_NOT_FOUND: "По Вашему запросу не было найдено ни одного аккаунта на GitHub.",
    GH_FOLLOWING: "Подписок",
    GH_FOLLOWERS: "Подписчиков",
    GH_REPOS: "Репозиториев",
    GH_WEBSITE: "Сайт",
    GH_LOCATION: "Локация",
    GH_JOB: "Организация",
    GH_BIO: "О себе",
    URL: "URL-адрес",
    CMD_DISABLED: "Эта команда была выключена на данном сервере.",
    CALC: "Калькулятор",
    CALC_ERR: "При выполнении вычислений произошла ошибка.",
  },
};
