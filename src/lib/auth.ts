import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";

function getSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signToken(username: string): Promise<string> {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyToken(
  token: string
): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { username: string };
  } catch {
    return null;
  }
}

/** Check auth from the request cookie (for use in API route handlers). */
export async function getAuthFromRequest(
  request: Request
): Promise<{ username: string } | null> {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`)
  );
  if (!match) return null;
  return verifyToken(match[1]);
}

/** Check auth from Next.js cookies() (for use in Server Components / middleware). */
export async function getAuthFromCookies(): Promise<{
  username: string;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export { COOKIE_NAME };
