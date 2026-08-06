import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const reports = db.getReports();
  return NextResponse.json({ success: true, reports });
}
