import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email sudah terdaftar.' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'user',
      isActive: true,
    };
    await db.collection('users').insertOne(newUser);
    return NextResponse.json({ message: 'Registrasi berhasil.' });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server.', detail: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
