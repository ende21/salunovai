import { NextRequest, NextResponse } from 'next/server';
import { understandGeminiImage } from '@/lib/gemini_api';

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) return NextResponse.json({ error: 'imageBase64 is required.' }, { status: 400 });
    const result = await understandGeminiImage(imageBase64);
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
