import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      const missing = [];
      if (!TELEGRAM_BOT_TOKEN) missing.push('TELEGRAM_BOT_TOKEN');
      if (!TELEGRAM_CHAT_ID) missing.push('TELEGRAM_CHAT_ID');
      const allKeys = Object.keys(process.env).filter(k => k.startsWith('TELEGRAM'));
      console.error(`Missing variables: ${missing.join(', ')}. Found TELEGRAM keys: ${allKeys.join(', ')}`);
      return NextResponse.json(
        { error: 'Server misconfiguration', missing, foundKeys: allKeys },
        { status: 500 }
      );
    }

    const message = `
🌟 <b>New Workspace Enquiry!</b> 🌟

👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}
📱 <b>Phone:</b> ${phone}

<i>Sent via Nexa Workspace Website</i>
    `;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      console.error('Telegram API Error:', telegramData);
      throw new Error(telegramData.description || 'Failed to send to Telegram');
    }

    return NextResponse.json(
      { success: true, message: 'Enquiry sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
