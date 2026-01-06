import { NextRequest, NextResponse } from 'next/server';
import { geminiEmbedding } from '@/lib/gemini_api';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
    const result = await geminiEmbedding(text);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
