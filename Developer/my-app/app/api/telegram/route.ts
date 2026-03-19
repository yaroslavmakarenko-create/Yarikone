import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  phone: z.string().min(10, 'Phone number is too short'),
  locale: z.string()
})

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN'
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID'
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = formSchema.parse(body)

    const { name, phone, locale } = validated

    const languageLabels: Record<string, string> = {
      uk: '🇺🇦 Українська',
      en: '🇬🇧 English',
      ru: '🇷🇺 Русский'
    }

    const text = `
🎯 <b>New Lead from Website!</b>

👤 <b>Name:</b> ${name}
📞 <b>Phone:</b> ${phone}
🌐 <b>Language:</b> ${languageLabels[locale] || locale}

⏰ <b>Time:</b> ${new Date().toLocaleString('uk-UA')}
    `.trim()

    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML'
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Telegram API error:', error)
      throw new Error('Failed to send message to Telegram')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    })

  } catch (error) {
    console.error('Form submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
