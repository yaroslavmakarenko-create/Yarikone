'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'uk', label: 'UA' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' }
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={cn(
            'px-2 py-1 rounded text-xs font-medium transition-colors',
            locale === lang.code 
              ? 'bg-accent-gold text-primary-dark' 
              : 'text-white/60 hover:text-white hover:bg-white/10'
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
