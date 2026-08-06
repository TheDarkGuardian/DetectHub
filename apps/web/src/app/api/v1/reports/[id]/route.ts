import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const report = db.getReportById(id);
  if (!report) {
    return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, report });
}
