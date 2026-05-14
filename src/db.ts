import initSqlJs from 'sql.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/store.db');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any = null;
let initPromise: Promise<void> | null = null;

function saveDb() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dbPath, buffer);
}

async function ensureDB(): Promise<void> {
  if (db) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const SQL = await initSqlJs();

    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      db = new SQL.Database(buffer);
    } else {
      db = new SQL.Database();
    }
  })();

  return initPromise;
}

export function createDBProxy() {
  return {
    prepare: (sql: string) => {
      const stmt = db.prepare(sql);
      return {
        bind: (...params: any[]) => ({
          run: () => {
            if (params.length > 0) stmt.bind(params);
            stmt.step();
            stmt.free();
            saveDb();
          },
          first: () => {
            if (params.length > 0) stmt.bind(params);
            const hasRow = stmt.step();
            if (!hasRow) {
              stmt.free();
              return null;
            }
            const row = stmt.getAsObject();
            stmt.free();
            return row;
          },
          all: () => {
            if (params.length > 0) stmt.bind(params);
            const results: any[] = [];
            while (stmt.step()) {
              results.push(stmt.getAsObject());
            }
            stmt.free();
            return { results };
          },
        }),
        run: (...params: any[]) => {
          if (params.length > 0) stmt.bind(params);
          stmt.step();
          stmt.free();
          saveDb();
        },
        first: (...params: any[]) => {
          if (params.length > 0) stmt.bind(params);
          const hasRow = stmt.step();
          if (!hasRow) {
            stmt.free();
            return null;
          }
          const row = stmt.getAsObject();
          stmt.free();
          return row;
        },
        all: (...params: any[]) => {
          if (params.length > 0) stmt.bind(params);
          const results: any[] = [];
          while (stmt.step()) {
            results.push(stmt.getAsObject());
          }
          stmt.free();
          return { results };
        },
      };
    },
    exec: (sql: string) => {
      db.run(sql);
      saveDb();
      return { success: true };
    },
  };
}

export type D1Database = ReturnType<typeof createDBProxy>;
export { ensureDB as initDatabase };