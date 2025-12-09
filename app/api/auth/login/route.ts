import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { MongoClient } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 });
    }
    const client: MongoClient = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ email });
    if (!user || !user.password) {
      return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 });
    }
    // Anda bisa menambahkan pembuatan session/token di sini jika perlu
    return NextResponse.json({ message: 'Login berhasil.', user: { email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    return NextResponse.json({ error: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}
