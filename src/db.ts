import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/store.db');

let db: Database.Database | null = null;

export function getDB(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
  }
  return db;
}

export function createDBProxy() {
  return {
    prepare: (sql: string) => {
      const stmt = getDB().prepare(sql);
      return {
        bind: (...params: any[]) => ({
          run: () => stmt.run(...params),
          first: () => stmt.get(...params),
          all: () => ({ results: stmt.all(...params) }),
        }),
        run: (...params: any[]) => stmt.run(...params),
        first: (...params: any[]) => stmt.get(...params),
        all: (...params: any[]) => ({ results: stmt.all(...params) }),
      };
    },
    exec: (sql: string) => {
      getDB().exec(sql);
      return { success: true };
    },
  };
}

export type D1Database = ReturnType<typeof createDBProxy>;
