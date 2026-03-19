export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    // Валідація
    if (!name || name.trim().length < 2) {
      return Response.json({ error: "Введіть ім'я (мінімум 2 символи)" }, { status: 400 });
    }
    
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phone || !phoneRegex.test(phone.trim())) {
      return Response.json({ error: "Введіть коректний номер телефону" }, { status: 400 });
    }

    // Отримуємо токен з Environment Variables
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Missing Telegram credentials");
      return Response.json({ error: "Server configuration error" }, { status: 500 });
    }

    const message = `
🎯 <b>Нова заявка з сайту!</b>

👤 <b>Ім'я:</b> ${name}
📞 <b>Телефон:</b> ${phone}
⏰ <b>Час:</b> ${new Date().toLocaleString('uk-UA')}
    `.trim();

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return Response.json({ error: "Failed to send message" }, { status: 500 });
    }

    return Response.json({ success: true, message: "Повідомлення надіслано!" });

  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
