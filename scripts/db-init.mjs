// scripts/db-init.mjs
// Cria as tabelas no Neon DB e insere dados de seed (somente se vazias).
// Requer Node 20.6+ para --env-file, ou configure DATABASE_URL manualmente.
//
// Uso: node --env-file=.env scripts/db-init.mjs

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

// Carrega .env manualmente (fallback para Node < 20.6)
try {
  const env = readFileSync(new URL("../.env", import.meta.url), "utf-8");
  for (const line of env.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  // .env not found — rely on existing env vars
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("❌  DATABASE_URL não definida.");
  process.exit(1);
}

const sql = neon(url);

async function main() {
  console.log("🔗  Conectando ao Neon...");

  // ── DDL ──────────────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id               TEXT        PRIMARY KEY,
      title            TEXT        NOT NULL DEFAULT '',
      slug             TEXT        NOT NULL DEFAULT '',
      short_description TEXT       NOT NULL DEFAULT '',
      content          TEXT        NOT NULL DEFAULT '',
      cover_image      TEXT        NOT NULL DEFAULT '',
      technologies     JSONB       NOT NULL DEFAULT '[]',
      category         TEXT        NOT NULL DEFAULT '',
      github_url       TEXT        NOT NULL DEFAULT '',
      live_url         TEXT        NOT NULL DEFAULT '',
      featured         BOOLEAN     NOT NULL DEFAULT false,
      published        BOOLEAN     NOT NULL DEFAULT false,
      created_at       TEXT        NOT NULL DEFAULT ''
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS skills (
      id       TEXT    PRIMARY KEY,
      name     TEXT    NOT NULL DEFAULT '',
      category TEXT    NOT NULL DEFAULT 'frontend',
      level    INTEGER NOT NULL DEFAULT 80,
      icon     TEXT    NOT NULL DEFAULT ''
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS experiences (
      id           TEXT  PRIMARY KEY,
      company      TEXT  NOT NULL DEFAULT '',
      role         TEXT  NOT NULL DEFAULT '',
      description  TEXT  NOT NULL DEFAULT '',
      start_date   TEXT  NOT NULL DEFAULT '',
      end_date     TEXT,
      technologies JSONB NOT NULL DEFAULT '[]'
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS certifications (
      id             TEXT PRIMARY KEY,
      name           TEXT NOT NULL DEFAULT '',
      institution    TEXT NOT NULL DEFAULT '',
      issue_date     TEXT NOT NULL DEFAULT '',
      credential_url TEXT NOT NULL DEFAULT ''
    )
  `;

  console.log("✅  Tabelas criadas (ou já existiam).");

  // ── Seed (somente se vazio) ───────────────────────────────────────────────
  const [{ count: projectCount }] = await sql`SELECT COUNT(*)::int AS count FROM projects`;

  if (Number(projectCount) === 0) {
    console.log("🌱  Inserindo seed...");

    await sql`
      INSERT INTO projects (id, title, slug, short_description, content, cover_image, technologies, category, github_url, live_url, featured, published, created_at)
      VALUES
        ('seed-proj-1', 'SaaS Analytics Dashboard', 'saas-analytics',
         'Dashboard em tempo real para métricas de produto.',
         'Construído com Next.js, PostgreSQL e visualização customizada.',
         'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
         '["Next.js","PostgreSQL","Tailwind"]', 'SaaS', 'https://github.com', 'https://example.com',
         true, true, '2024-01-01T00:00:00.000Z'),

        ('seed-proj-2', 'E-commerce Headless', 'ecommerce-headless',
         'Loja headless com checkout Stripe.',
         'Integração completa com Stripe e CMS.',
         'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200',
         '["React","Stripe","Supabase"]', 'Web', '', '',
         true, true, '2024-02-01T00:00:00.000Z')
    `;

    await sql`
      INSERT INTO skills (id, name, category, level, icon)
      VALUES
        ('seed-skill-1', 'React',      'frontend', 95, '⚛️'),
        ('seed-skill-2', 'TypeScript', 'frontend', 90, '🟦'),
        ('seed-skill-3', 'Node.js',    'backend',  85, '🟢'),
        ('seed-skill-4', 'PostgreSQL', 'database', 80, '🐘')
    `;

    await sql`
      INSERT INTO experiences (id, company, role, description, start_date, end_date, technologies)
      VALUES
        ('seed-exp-1', 'Freelancer', 'Full Stack Developer',
         'Sites e apps web sob demanda para clientes de diferentes setores.',
         '2024-01', NULL, '["React","Next.js","Supabase"]')
    `;

    console.log("✅  Seed inserido com sucesso.");
  } else {
    console.log(`ℹ️   Banco já contém ${projectCount} projeto(s). Seed ignorado.`);
  }

  console.log("🎉  Banco inicializado!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌  Erro:", err.message);
  process.exit(1);
});
