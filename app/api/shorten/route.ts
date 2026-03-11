import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`,
      { headers: { 'User-Agent': 'ToolVerse/1.0' } }
    );

    const text = await response.text();

    if (!response.ok || text.startsWith('Error:')) {
      return NextResponse.json({ error: text || 'Failed to shorten URL' }, { status: 400 });
    }

    return NextResponse.json({ shortUrl: text.trim() });
  } catch (error) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }
}
