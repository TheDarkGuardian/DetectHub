import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const scanRequests = db.getScanRequests();
  return NextResponse.json({ success: true, scanRequests });
}
