import { NextResponse } from 'next/server';
import { PinData } from '@/lib/pinterest/types';

// Diverse set of fallback images mimicking a Pinterest moodboard (portraits, design, abstract, editorial)
const FALLBACK_PINS: PinData[] = [
  { id: '1', imageUrl: 'https://picsum.photos/seed/a1/400/600', width: 400, height: 600 },
  { id: '2', imageUrl: 'https://picsum.photos/seed/a2/600/400', width: 600, height: 400 },
  { id: '3', imageUrl: 'https://picsum.photos/seed/a3/500/750', width: 500, height: 750 },
  { id: '4', imageUrl: 'https://picsum.photos/seed/a4/400/400', width: 400, height: 400 },
  { id: '5', imageUrl: 'https://picsum.photos/seed/a5/450/600', width: 450, height: 600 },
  { id: '6', imageUrl: 'https://picsum.photos/seed/a6/500/500', width: 500, height: 500 },
  { id: '7', imageUrl: 'https://picsum.photos/seed/a7/600/800', width: 600, height: 800 },
  { id: '8', imageUrl: 'https://picsum.photos/seed/a8/700/450', width: 700, height: 450 },
  { id: '9', imageUrl: 'https://picsum.photos/seed/a9/400/650', width: 400, height: 650 },
  { id: '10', imageUrl: 'https://picsum.photos/seed/a10/500/400', width: 500, height: 400 },
  { id: '11', imageUrl: 'https://picsum.photos/seed/a11/600/900', width: 600, height: 900 },
  { id: '12', imageUrl: 'https://picsum.photos/seed/a12/400/400', width: 400, height: 400 },
  { id: '13', imageUrl: 'https://picsum.photos/seed/a13/450/700', width: 450, height: 700 },
  { id: '14', imageUrl: 'https://picsum.photos/seed/a14/550/400', width: 550, height: 400 },
  { id: '15', imageUrl: 'https://picsum.photos/seed/a15/500/600', width: 500, height: 600 },
  { id: '16', imageUrl: 'https://picsum.photos/seed/a16/800/600', width: 800, height: 600 },
  { id: '17', imageUrl: 'https://picsum.photos/seed/a17/400/550', width: 400, height: 550 },
  { id: '18', imageUrl: 'https://picsum.photos/seed/a18/500/500', width: 500, height: 500 },
  { id: '19', imageUrl: 'https://picsum.photos/seed/a19/600/850', width: 600, height: 850 },
  { id: '20', imageUrl: 'https://picsum.photos/seed/a20/700/500', width: 700, height: 500 },
];

export async function GET() {
  // If we had a real PINTEREST_ACCESS_TOKEN, we'd fetch from Pinterest here.
  // We'll return the high-quality fallbacks for this implementation.
  return NextResponse.json({ pins: FALLBACK_PINS, fallback: true });
}
