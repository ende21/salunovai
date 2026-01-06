import { NextRequest, NextResponse } from 'next/server';
import { geminiFunctionCalling } from '@/lib/gemini_api';

export async function POST(req: NextRequest) {
  try {
    const { prompt, functions } = await req.json();
    if (!prompt || !functions) return NextResponse.json({ error: 'Prompt and functions are required.' }, { status: 400 });
    const result = await geminiFunctionCalling(prompt, functions);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
