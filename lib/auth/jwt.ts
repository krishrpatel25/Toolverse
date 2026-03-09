// JWT Authentication Utilities
// Note: In production, use a proper JWT library like jsonwebtoken

const SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';

interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Simple mock JWT implementation for development
// In production, use: npm install jsonwebtoken
export async function signJWT(payload: JWTPayload): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const token_payload = {
    ...payload,
    iat: now,
    exp: now + 60 * 60 * 24 * 7, // 7 days
  };

  // Simple base64 encoding (not cryptographically secure, for dev only)
  const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url');
  const payloadB64 = Buffer.from(JSON.stringify(token_payload)).toString('base64url');
  
  // Create signature (simplified - use proper JWT in production)
  const signature = Buffer.from(`${SECRET}.${headerB64}.${payloadB64}`).toString('base64url');
  
  return `${headerB64}.${payloadB64}.${signature}`;
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64] = parts;
    
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    
    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export async function decodeJWT(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payloadB64 = parts[1];
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    
    return payload;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

  return parts[1];
}
