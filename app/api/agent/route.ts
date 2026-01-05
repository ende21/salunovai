import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiText } from '@/lib/gemini_api';

// GET: List all agents (dummy)
export async function GET(req: NextRequest) {
  return NextResponse.json({ agents: [] });
}

// POST: Kirim prompt ke Gemini API dan balas hasilnya
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }
    const result = await generateGeminiText(prompt);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
