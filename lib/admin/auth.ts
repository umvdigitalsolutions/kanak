import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isMongoConfigured } from "@/lib/backend/mongodb";

const cookieName = "kanak_admin_session";
const sessionMaxAge = 60 * 60 * 8;

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || adminPassword();
}

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string) {
  return timingSafeEqual(hash(a), hash(b));
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

function createSessionValue() {
  const expires = Date.now() + sessionMaxAge * 1000;
  const payload = `v1.${expires}`;
  return `${payload}.${sign(payload)}`;
}

function verifySessionValue(value?: string) {
  if (!value || !sessionSecret()) {
    return false;
  }

  const parts = value.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") {
    return false;
  }

  const payload = `${parts[0]}.${parts[1]}`;
  const expected = sign(payload);
  const expires = Number(parts[1]);

  if (!Number.isFinite(expires) || expires < Date.now()) {
    return false;
  }

  return safeEqual(parts[2], expected);
}

export function getAdminSetupStatus() {
  return {
    adminPasswordConfigured: Boolean(adminPassword()),
    adminSessionSecretConfigured: Boolean(process.env.ADMIN_SESSION_SECRET),
    mongoConfigured: isMongoConfigured(),
  };
}

export async function signInAdmin(password: string) {
  if (!adminPassword() || !safeEqual(password, adminPassword())) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(cookieName, createSessionValue(), {
    httpOnly: true,
    maxAge: sessionMaxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return true;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifySessionValue(cookieStore.get(cookieName)?.value);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
