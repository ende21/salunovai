import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Dummy authentication logic (replace with real DB/user check)
  if (email === 'admin@example.com' && password === 'password123') {
    return NextResponse.json({ success: true, message: 'Login successful', token: 'dummy-jwt-token' });
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
