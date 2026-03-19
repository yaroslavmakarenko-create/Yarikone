#!/bin/bash

# Скрипт для швидкого деплою на GitHub + Vercel
# Використання: ./deploy-script.sh

echo "🚀 Починаємо деплой Yaroslav Makarenko Realty"
echo ""

# Перевірка чи встановлено git
if ! command -v git &> /dev/null; then
    echo "❌ Git не встановлено. Встановіть: https://git-scm.com/downloads"
    exit 1
fi

# Запитуємо дані
read -p "Ваш GitHub username: " GITHUB_USER
read -p "Назва репозиторію (yaroslav-makarenko-realty): " REPO_NAME
REPO_NAME=${REPO_NAME:-yaroslav-makarenko-realty}

read -p "TELEGRAM_BOT_TOKEN: " BOT_TOKEN
read -p "TELEGRAM_CHAT_ID: " CHAT_ID

echo ""
echo "📁 Створюємо проєкт..."

# Створюємо папку
mkdir -p $REPO_NAME
cd $REPO_NAME

# Ініціалізуємо git
git init

# Створюємо .gitignore
cat > .gitignore << 'EOF'
node_modules/
.next/
dist/
.env
.env.local
EOF

# Створюємо README
cat > README.md << EOF
# Yaroslav Makarenko - Real Estate Website

Premium real estate landing page with Telegram notifications.

## Environment Variables

\`\`\`
TELEGRAM_BOT_TOKEN=$BOT_TOKEN
TELEGRAM_CHAT_ID=$CHAT_ID
\`\`\`
EOF

echo "📦 Копіюємо файли проєкту..."

# Тут потрібно скопіювати всі файли проєкту
# (ви маєте розпакувати vercel-app.zip сюди)

echo ""
echo "⚠️  ЗАВЕРШІТЬ НАЛАШТУВАННЯ:"
echo ""
echo "1. Розпакуйте архів vercel-app.zip у папку $REPO_NAME"
echo "2. Потім виконайте ці команди:"
echo ""
echo "   cd $REPO_NAME"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   gh repo create $REPO_NAME --public --source=. --push"
echo ""
echo "3. Перейдіть на vercel.com та імпортуйте репозиторій"
echo "4. Додайте Environment Variables:"
echo "   TELEGRAM_BOT_TOKEN=$BOT_TOKEN"
echo "   TELEGRAM_CHAT_ID=$CHAT_ID"
echo ""
