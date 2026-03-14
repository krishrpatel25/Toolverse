import { NextRequest, NextResponse } from "next/server";
import { createHmac, pbkdf2Sync, randomBytes } from "crypto";

// Simple bcrypt-compatible hash using Node.js crypto
// We implement a bcrypt-like API: generate a salted hash and verify it
const COST_FACTOR = { "8": 256, "10": 1024, "12": 4096, "14": 16384 };

function generateHash(text: string, rounds: number): string {
  const salt = randomBytes(16).toString("hex");
  const iterations = COST_FACTOR[String(rounds) as keyof typeof COST_FACTOR] ?? 1024;
  const hash = pbkdf2Sync(text, salt, iterations, 32, "sha256").toString("hex");
  return `$pbkdf2$${rounds}$${salt}$${hash}`;
}

function verifyHash(text: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split("$");
    if (parts[1] !== "pbkdf2") return false;
    const rounds = parseInt(parts[2]);
    const salt = parts[3];
    const expected = parts[4];
    const iterations = COST_FACTOR[String(rounds) as keyof typeof COST_FACTOR] ?? 1024;
    const hash = pbkdf2Sync(text, salt, iterations, 32, "sha256").toString("hex");
    return hash === expected;
  } catch { return false; }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, rounds, hash } = body;

    if (!text) return NextResponse.json({ error: "text is required" }, { status: 400 });

    // If hash is provided → verify mode
    if (hash) {
      const match = verifyHash(text, hash);
      return NextResponse.json({ match });
    }

    // Generate mode
    const r = Math.min(Math.max(parseInt(rounds) || 10, 8), 14);
    const generated = generateHash(text, r);
    return NextResponse.json({ hash: generated });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
