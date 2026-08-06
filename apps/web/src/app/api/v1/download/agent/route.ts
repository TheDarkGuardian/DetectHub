import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const os = searchParams.get('os') || 'windows';

  const isMac = os === 'mac';
  const filename = isMac ? 'DetectHub-Agent-v2.4.0.dmg' : 'DetectHub-Agent-v2.4.0-Setup.exe';
  const filePath = path.join(process.cwd(), 'public', 'downloads', filename);

  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    const headers = new Headers();
    headers.set('Content-Type', isMac ? 'application/x-apple-diskimage' : 'application/x-msdownload');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  }

  return new NextResponse('DetectHub Native Desktop Installer', { status: 200 });
}
