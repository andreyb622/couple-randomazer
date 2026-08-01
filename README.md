# Рандомайзер пар — Telegram Mini App

Мини-приложение для Telegram: случайное формирование пар из двух списков (девушки и парни). Сформированная пара удаляется из обоих списков.

## Локальная разработка

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Деплой на GitHub Pages

1. Запушьте код в ветку `main` репозитория `couple-randomazer`.
2. В настройках репозитория GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. После успешного workflow приложение будет доступно по адресу:

   `https://andreyb622.github.io/couple-randomazer/`

## Подключение к Telegram-боту

1. Откройте [@BotFather](https://t.me/BotFather).
2. Команда `/newapp` → выберите `@my_randomizer_username_bot`.
3. Укажите URL: `https://andreyb622.github.io/couple-randomazer/`.
4. Добавьте кнопку Mini App в канал или меню бота.

## Функции

- Два редактируемых списка имён
- Случайное формирование пар (1 девушка + 1 парень)
- История сформированных пар
- Сброс к начальным спискам
- Адаптация под тему Telegram (светлая/тёмная)
