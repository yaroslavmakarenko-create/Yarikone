# Yaroslav Makarenko - Real Estate Website

## Деплой на Vercel

### Крок 1: Завантажте файли на GitHub
1. Створіть новий репозиторій на GitHub
2. Завантажте всі файли з папки `vercel-app`

### Крок 2: Підключіть до Vercel
1. Зайдіть на [vercel.com](https://vercel.com)
2. Натисніть "Add New Project"
3. Імпортуйте репозиторій з GitHub
4. Налаштування залиште за замовчуванням

### Крок 3: Environment Variables
У налаштуваннях проєкту (Settings → Environment Variables) додайте:

```
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
```

### Як отримати TELEGRAM_BOT_TOKEN:
1. Напишіть @BotFather в Telegram
2. Створіть нового бота: `/newbot`
3. Скопіюйте токен

### Як отримати TELEGRAM_CHAT_ID:
1. Напишіть боту @userinfobot
2. Отримаєте ваш ID

## Структура проєкту

```
vercel-app/
├── app/
│   ├── api/contact/route.ts    # API для Telegram
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Головна сторінка
│   └── globals.css             # Глобальні стилі
├── components/
│   ├── layout/                 # Header, Footer
│   └── sections/               # Hero, Benefits, CTA...
├── lib/
│   ├── utils.ts                # Утиліти
│   └── animations.ts           # Framer Motion анімації
├── public/images/              # Зображення
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Технології

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Telegram Bot API
