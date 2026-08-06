import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const rules = db.getRules();
  return NextResponse.json({ success: true, rules });
}

export async function PUT(request: Request) {
  try {
    const { id, scoreWeight } = await request.json();
    const updatedRules = db.updateRuleWeight(id, scoreWeight);
    return NextResponse.json({ success: true, rules: updatedRules });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
