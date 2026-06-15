// admin-store.tsx — apenas tipos de domínio e autenticação local.
// Todo o estado de dados foi migrado para Neon DB via server functions.

// ── Types ─────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  coverImage: string;
  technologies: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
};

export type Skill = {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "devops";
  level: number;
  icon: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  technologies: string[];
};

export type Certification = {
  id: string;
  name: string;
  institution: string;
  issueDate: string;
  credentialUrl: string;
};

// ── Auth (simples, via localStorage) ─────────────────────────────────────

const AUTH_KEY = "admin_auth_v1";
export const ADMIN_EMAIL = "admin@bernardo.dev";
export const ADMIN_PASSWORD = "admin123";

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function signIn(email: string, password: string) {
  if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    window.localStorage.setItem(AUTH_KEY, "1");
    return true;
  }
  return false;
}

export function signOut() {
  window.localStorage.removeItem(AUTH_KEY);
}
