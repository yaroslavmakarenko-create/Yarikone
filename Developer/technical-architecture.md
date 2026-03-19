# Технічна Архітектура Лендингу Нерухомості
## "Yaroslav Makarenko" — Технічна Документація

---

## 1. Загальний Огляд

### Обраний Стек Технологій
| Категорія | Технологія | Версія |
|-----------|------------|--------|
| Фреймворк | **Next.js 14** (App Router) | ^14.x |
| Мова | TypeScript | ^5.x |
| Стили | Tailwind CSS | ^3.x |
| UI Компоненти | shadcn/ui | latest |
| Анімації | Framer Motion | ^11.x |
| Іконки | Lucide React | latest |
| Форми | React Hook Form + Zod | ^7.x / ^3.x |
| i18n | next-intl | ^3.x |

### Чому Next.js (а не Vite)
- **SEO-оптимізація** — критично важлива для нерухомості
- **SSR/SSG** — швидке завантаження та індексація
- **Image Optimization** — автоматична оптимізація зображень
- **API Routes** — зручно для Telegram webhook
- **Міжнародна маршрутизація** — вбудована підтримка i18n

---

## 2. Структура Проєкту

```
yaroslav-makarenko-realty/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Локалізовані маршрути
│   │   ├── layout.tsx            # Кореневий layout з i18n
│   │   ├── page.tsx              # Головна сторінка
│   │   └── globals.css           # Глобальні стилі
│   ├── api/
│   │   └── telegram/
│   │       └── route.ts          # API endpoint для Telegram
│   └── layout.tsx                # Root layout (без locale)
├── components/
│   ├── ui/                       # shadcn/ui компоненти
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── sheet.tsx
│   ├── sections/                 # Секції лендингу
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Properties.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── layout/                   # Layout компоненти
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   ├── forms/                    # Форми
│   │   └── ContactForm.tsx
│   └── shared/                   # Спільні компоненти
│       ├── SectionTitle.tsx
│       ├── AnimatedSection.tsx
│       ├── LanguageSwitcher.tsx
│       └── ScrollToTop.tsx
├── hooks/                        # Custom React hooks
│   ├── useScrollSpy.ts
│   ├── useMediaQuery.ts
│   └── useSmoothScroll.ts
├── lib/                          # Утиліти та конфігурація
│   ├── utils.ts                  # cn() та інші утиліти
│   ├── telegram.ts               # Telegram API logic
│   └── validations.ts            # Zod схеми
├── i18n/                         # Інтернаціоналізація
│   ├── config.ts                 # Конфігурація i18n
│   ├── messages/
│   │   ├── uk.json               # Українська (дефолт)
│   │   ├── en.json               # Англійська
│   │   └── ru.json               # Російська
│   └── navigation.ts             # Навігаційні мітки
├── types/                        # TypeScript типи
│   └── index.ts
├── public/                       # Статичні файли
│   ├── images/
│   │   ├── hero/
│   │   ├── properties/
│   │   └── about/
│   └── fonts/
├── middleware.ts                 # Next.js middleware для i18n
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. NPM Пакети

### Основні Залежності
```bash
# Ініціалізація проєкту
npx create-next-app@latest yaroslav-makarenko-realty --typescript --tailwind --app

# shadcn/ui ініціалізація
npx shadcn-ui@latest init

# UI компоненти shadcn
npx shadcn-ui@latest add button input textarea select card badge sheet

# Інтернаціоналізація
npm install next-intl

# Анімації
npm install framer-motion

# Форми та валідація
npm install react-hook-form @hookform/resolvers zod

# Іконки
npm install lucide-react

# Класи утиліти
npm install clsx tailwind-merge
```

### Повний package.json
```json
{
  "name": "yaroslav-makarenko-realty",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-intl": "^3.15.0",
    "framer-motion": "^11.2.0",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.4.0",
    "zod": "^3.23.0",
    "lucide-react": "^0.378.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## 4. Архітектура Компонентів

### 4.1 Діаграма Компонентів

```
┌─────────────────────────────────────────────────────────────┐
│                        RootLayout                            │
│                    (Metadata, Fonts)                         │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      LocaleLayout                            │
│              (i18n Provider, Direction)                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼──────┐  ┌─────────▼─────────┐  ┌─────▼──────┐
│    Header    │  │   Main Content    │  │   Footer   │
│  (Sticky)    │  │                   │  │            │
└──────────────┘  └───────────────────┘  └────────────┘
                          │
    ┌─────────┬───────────┼───────────┬─────────┐
    │         │           │           │         │
┌───▼───┐ ┌───▼───┐  ┌────▼───┐ ┌────▼──┐ ┌────▼────┐
│ Hero  │ │ About │  │Services│ │Properties│Contact│
│       │ │       │  │        │ │        │ │       │
└───────┘ └───────┘  └────────┘ └────────┘ └───────┘
```

### 4.2 Опис Компонентів

#### Layout Компоненти

**Header.tsx**
```typescript
interface HeaderProps {
  locale: string;
}
// Sticky header з навігацією та перемикачем мови
// Змінює стилі при скролі (glassmorphism effect)
```

**Navigation.tsx**
```typescript
interface NavItem {
  id: string;
  labelKey: string; // Ключ для i18n
  href: string;
}
// Навігація по секціях з активним станом
```

#### Секційні Компоненти

**Hero.tsx**
- Повноекранна секція з фоновим зображенням
- Заголовок з анімацією появи
- CTA кнопки
- Соціальні посилання

**About.tsx**
- Фото агента
- Біографія
- Досягнення/статистика
- Сертифікати

**Services.tsx**
- Картки послуг з іконками
- Grid layout
- Hover анімації

**Properties.tsx**
- Галерея об'єктів
- Фільтрація (опціонально)
- Карточки нерухомості

**Testimonials.tsx**
- Відгуки клієнтів
- Слайдер/карусель

**Contact.tsx**
- Контактна форма
- Контактна інформація
- Карта (опціонально)

#### Спільні Компоненти

**AnimatedSection.tsx**
```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}
// Обертка для анімації появи при скролі
```

**SectionTitle.tsx**
```typescript
interface SectionTitleProps {
  titleKey: string;
  subtitleKey?: string;
  centered?: boolean;
}
// Заголовок секції з анімацією
```

---

## 5. План Реалізації i18n

### 5.1 Конфігурація

**i18n/config.ts**
```typescript
export const i18nConfig = {
  locales: ['uk', 'en', 'ru'] as const,
  defaultLocale: 'uk' as const,
  localePrefix: 'always' // /uk/, /en/, /ru/
};

export type Locale = (typeof i18nConfig.locales)[number];
```

**middleware.ts**
```typescript
import createMiddleware from 'next-intl/middleware';
import { i18nConfig } from './i18n/config';

export default createMiddleware({
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
  localePrefix: i18nConfig.localePrefix
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

### 5.2 Структура Перекладів

**i18n/messages/uk.json (дефолт)**
```json
{
  "metadata": {
    "title": "Yaroslav Makarenko | Експерт з нерухомості",
    "description": "Професійні послуги з купівлі, продажу та оренди нерухомості"
  },
  "navigation": {
    "home": "Головна",
    "about": "Про мене",
    "services": "Послуги",
    "properties": "Об'єкти",
    "testimonials": "Відгуки",
    "contact": "Контакти"
  },
  "hero": {
    "greeting": "Привіт, я",
    "name": "Ярослав Макаренко",
    "title": "Експерт з нерухомості",
    "subtitle": "Допомагаю знайти ідеальну нерухомість у Києві та області",
    "ctaPrimary": "Зв'язатися",
    "ctaSecondary": "Дізнатися більше"
  },
  "about": {
    "title": "Про мене",
    "subtitle": "Ваш надійний партнер у світі нерухомості",
    "description": "...",
    "stats": {
      "experience": "Років досвіду",
      "deals": "Успішних угод",
      "clients": "Задоволених клієнтів"
    }
  },
  "services": {
    "title": "Мої послуги",
    "subtitle": "Комплексний підхід до ваших потреб у нерухомості",
    "items": {
      "sale": {
        "title": "Продаж нерухомості",
        "description": "..."
      },
      "purchase": {
        "title": "Купівля нерухомості",
        "description": "..."
      },
      "rent": {
        "title": "Оренда",
        "description": "..."
      },
      "consultation": {
        "title": "Консультація",
        "description": "..."
      }
    }
  },
  "contact": {
    "title": "Зв'яжіться зі мною",
    "subtitle": "Готовий допомогти з вашими питаннями нерухомості",
    "form": {
      "name": "Ваше ім'я",
      "phone": "Телефон",
      "email": "Email",
      "message": "Повідомлення",
      "submit": "Відправити",
      "success": "Дякую! Я зв'яжуся з вами найближчим часом.",
      "error": "Виникла помилка. Спробуйте ще раз."
    }
  },
  "footer": {
    "rights": "Всі права захищені",
    "privacy": "Політика конфіденційності"
  }
}
```

### 5.3 Використання в Компонентах

```typescript
// Server Component
import { getTranslations } from 'next-intl/server';

export default async function Hero({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  
  return (
    <section>
      <h1>{t('name')}</h1>
      <p>{t('subtitle')}</p>
    </section>
  );
}

// Client Component
'use client';
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contact.form');
  
  return (
    <form>
      <input placeholder={t('name')} />
      <button>{t('submit')}</button>
    </form>
  );
}
```

### 5.4 Перемикач Мови

**components/shared/LanguageSwitcher.tsx**
```typescript
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const languages = [
  { code: 'uk', label: 'UA', flag: '🇺🇦' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' }
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={cn(
            'px-3 py-1 rounded-md transition-colors',
            locale === lang.code 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-muted'
          )}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  );
}
```

---

## 6. Логіка Відправки Форми в Telegram

### 6.1 API Route

**app/api/telegram/route.ts**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Ім\'я занадто коротке'),
  phone: z.string().min(10, 'Невірний формат телефону'),
  email: z.string().email('Невірний email').optional(),
  message: z.string().optional(),
  locale: z.string()
});

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = formSchema.parse(body);

    const { name, phone, email, message, locale } = validated;

    // Формування повідомлення
    const languageLabels: Record<string, string> = {
      uk: '🇺🇦 Українська',
      en: '🇬🇧 English',
      ru: '🇷🇺 Русский'
    };

    const text = `
🎯 <b>Нова заявка з сайту!</b>

👤 <b>Ім'я:</b> ${name}
📞 <b>Телефон:</b> ${phone}
${email ? `📧 <b>Email:</b> ${email}` : ''}
🌐 <b>Мова:</b> ${languageLabels[locale] || locale}

💬 <b>Повідомлення:</b>
${message || 'Не вказано'}

⏰ <b>Час:</b> ${new Date().toLocaleString('uk-UA')}
    `.trim();

    // Відправка в Telegram
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
      throw new Error('Failed to send message to Telegram');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 6.2 Компонент Форми

**components/forms/ContactForm.tsx**
```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const createFormSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t('validation.nameMin')),
  phone: z.string().min(10, t('validation.phoneMin')),
  email: z.string().email(t('validation.emailInvalid')).optional().or(z.literal('')),
  message: z.string().optional()
});

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formSchema = createFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale })
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert(t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold">{t('form.success')}</h3>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name">{t('form.name')} *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder={t('form.namePlaceholder')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('form.phone')} *</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder={t('form.phonePlaceholder')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('form.email')}</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder={t('form.emailPlaceholder')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t('form.message')}</Label>
              <Textarea
                id="message"
                {...register('message')}
                placeholder={t('form.messagePlaceholder')}
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('form.sending')}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t('form.submit')}
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
```

### 6.3 Змінні Оточення (.env.local)
```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
TELEGRAM_CHAT_ID=YOUR_CHAT_ID

# Optional: For production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 7. План Анімацій з Framer Motion

### 7.1 Анімаційні Константи

**lib/animations.ts**
```typescript
import { Variants } from 'framer-motion';

// Таймінг
export const TIMING = {
  fast: 0.2,
  normal: 0.5,
  slow: 0.8,
  stagger: 0.1
};

// Easing
export const EASING = {
  smooth: [0.25, 0.1, 0.25, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: { type: 'spring', stiffness: 100, damping: 15 }
};

// Варіанти анімацій
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.smooth
    }
  }
};

export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.smooth
    }
  }
};

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.smooth
    }
  }
};

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.smooth
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: TIMING.normal,
      ease: EASING.smooth
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: TIMING.stagger,
      delayChildren: 0.1
    }
  }
};

export const letterAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.fast,
      ease: EASING.smooth
    }
  }
};
```

### 7.2 Компонент AnimatedSection

**components/shared/AnimatedSection.tsx**
```typescript
'use client';

import { motion, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { fadeInUp } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  amount?: number;
}

export function AnimatedSection({
  children,
  className = '',
  variants = fadeInUp,
  delay = 0,
  once = true,
  amount = 0.3
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### 7.3 Анімації по Секціях

#### Hero Секція
```typescript
// Послідовна анімація елементів
const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Анімація фонового зображення
const bgImage: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut'
    }
  }
};
```

#### About Секція
```typescript
// Фото зліва — текст справа
// Фото: fadeInLeft
// Текст: fadeInRight з stagger для параграфів

const aboutImage: Variants = {
  hidden: { opacity: 0, x: -80, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const aboutContent: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
```

#### Services Секція
```typescript
// Grid карток з stagger ефектом
const servicesGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const serviceCard: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Hover ефект для карток
const cardHover = {
  scale: 1.03,
  y: -5,
  transition: {
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1]
  }
};
```

#### Properties Секція
```typescript
// Галерея з fadeInUp
// Hover: збільшення зображення

const propertyCard: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};
```

#### Contact Секція
```typescript
// Форма: fadeInLeft
// Контакти: fadeInRight
// Поля форми: stagger зверху вниз

const formContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const formField: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};
```

### 7.4 Scroll-Linked Анімації

**hooks/useScrollProgress.ts**
```typescript
'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export function useScrollProgress() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  return { ref, scrollYProgress };
}

// Приклад використання для паралаксу
export function ParallaxSection() {
  const { ref, scrollYProgress } = useScrollProgress();
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Background content */}
      </motion.div>
    </div>
  );
}
```

### 7.5 Header Scroll Effect

```typescript
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.1)']
  );

  return (
    <motion.header
      style={{
        backgroundColor: headerBg,
        boxShadow: headerShadow
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Header content */}
    </motion.header>
  );
}
```

---

## 8. Плавний Скрол до Секцій

### 8.1 Hook для Smooth Scroll

**hooks/useSmoothScroll.ts**
```typescript
'use client';

import { useCallback } from 'react';

export function useSmoothScroll() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      const headerOffset = 80; // Висота sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollToSection };
}
```

### 8.2 Навігація з Scroll Spy

**hooks/useScrollSpy.ts**
```typescript
'use client';

import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
```

### 8.3 Використання в Navigation

```typescript
'use client';

import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'hero', labelKey: 'navigation.home' },
  { id: 'about', labelKey: 'navigation.about' },
  { id: 'services', labelKey: 'navigation.services' },
  { id: 'properties', labelKey: 'navigation.properties' },
  { id: 'testimonials', labelKey: 'navigation.testimonials' },
  { id: 'contact', labelKey: 'navigation.contact' }
];

export function Navigation() {
  const t = useTranslations();
  const { scrollToSection } = useSmoothScroll();
  const activeSection = useScrollSpy(navItems.map(item => item.id));

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            activeSection === item.id 
              ? 'text-primary' 
              : 'text-muted-foreground'
          )}
        >
          {t(item.labelKey)}
        </button>
      ))}
    </nav>
  );
}
```

---

## 9. Tailwind Конфігурація

**tailwind.config.ts**
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
```

---

## 10. Команди для Розгортання

### Розробка
```bash
# Встановлення залежностей
npm install

# Запуск dev сервера
npm run dev

# Перевірка типів
npm run type-check

# Лінтинг
npm run lint
```

### Білд
```bash
# Production білд
npm run build

# Запуск production версії
npm start
```

### Налаштування Telegram Bot
1. Створіть бота через @BotFather
2. Отримайте BOT_TOKEN
3. Додайте бота в групу/канал
4. Отримайте CHAT_ID через https://api.telegram.org/bot<TOKEN>/getUpdates
5. Додайте змінні в .env.local

---

## 11. Чекліст Реалізації

### Фаза 1: Налаштування (День 1)
- [ ] Ініціалізація Next.js проєкту
- [ ] Налаштування Tailwind CSS
- [ ] Встановлення shadcn/ui
- [ ] Налаштування i18n (next-intl)
- [ ] Створення базової структури папок

### Фаза 2: Layout та Навігація (День 1-2)
- [ ] Header з sticky behavior
- [ ] Navigation з scroll spy
- [ ] Language switcher
- [ ] Mobile menu
- [ ] Footer

### Фаза 3: Секції (День 2-3)
- [ ] Hero секція
- [ ] About секція
- [ ] Services секція
- [ ] Properties секція
- [ ] Testimonials секція
- [ ] Contact секція з формою

### Фаза 4: Анімації (День 3-4)
- [ ] Framer Motion анімації для всіх секцій
- [ ] Scroll-triggered анімації
- [ ] Hover ефекти
- [ ] Page transitions

### Фаза 5: Форма та Telegram (День 4)
- [ ] Валідація форми (Zod)
- [ ] API route для Telegram
- [ ] Обробка помилок
- [ ] Success/error states

### Фаза 6: Тестування та Оптимізація (День 5)
- [ ] Тестування всіх мов
- [ ] Тестування форми
- [ ] Оптимізація зображень
- [ ] SEO оптимізація
- [ ] Performance audit

---

## Додаткові Ресурси

### Корисні Посилання
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Telegram Bot API](https://core.telegram.org/bots/api)

### Рекомендації
1. Використовуйте `next/image` для оптимізації зображень
2. Реалізуйте lazy loading для секцій нижче fold
3. Додайте мета-теги для кожної мови
4. Використовуйте `will-change` для анімованих елементів
5. Тестуйте на мобільних пристроях

---

*Документація створена для проєкту "Yaroslav Makarenko Realty Landing Page"*
*Версія: 1.0*
*Дата: 2025*
