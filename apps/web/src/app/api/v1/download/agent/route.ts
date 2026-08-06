import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const os = searchParams.get('os') || 'windows';

  const isMac = os === 'mac';
  const filename = isMac ? 'DetectHub-Agent-v2.4.0-macOS.zip' : 'DetectHub-Agent-v2.4.0-Windows.zip';
  const filePath = path.join(process.cwd(), 'public', 'downloads', filename);

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    const headers = new Headers();
    headers.set('Content-Type', 'application/zip');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  }

  // Fallback
  return new NextResponse('Agent Binary Package', { status: 200 });
}
