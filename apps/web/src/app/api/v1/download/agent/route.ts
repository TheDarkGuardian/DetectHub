import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const os = searchParams.get('os') || 'windows';

  const filename = os === 'mac' ? 'DetectHub-Agent-v2.4.0.dmg' : 'DetectHub-Agent-v2.4.0.msi';
  const fileContent = `DetectHub Agent v2.4.0 (${os.toUpperCase()}) Binary Payload`;

  const headers = new Headers();
  headers.set('Content-Type', 'application/octet-stream');
  headers.set('Content-Disposition', `attachment; filename="${filename}"`);

  return new NextResponse(fileContent, {
    status: 200,
    headers,
  });
}
