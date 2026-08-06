import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const inviteCode = `DETECT-${Math.floor(1000 + Math.random() * 9000)}-X${Math.floor(100 + Math.random() * 900)}`;

    const newRequest = db.addScanRequest({
      code: inviteCode,
      type: body.type || 'ONE_TIME',
      targetUser: body.targetUser || 'Fnatic Tournament Participant'
    });

    return NextResponse.json({
      success: true,
      scanRequest: newRequest,
      qrUrl: `https://detecthub.io/scan/${inviteCode}`
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
