import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiImage } from '@/lib/gemini_api';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    const result = await generateGeminiImage(prompt);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
