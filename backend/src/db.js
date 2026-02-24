import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.resolve(__dirname, '../data')
const DB_FILE = path.join(DATA_DIR, 'quizcraft.db')

let dbPromise = null

async function hasColumn(db, tableName, columnName) {
  const columns = await db.all(`PRAGMA table_info(${tableName})`)
  return columns.some((column) => column.name === columnName)
}

async function runMigrations(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `)

  if (!(await hasColumn(db, 'users', 'role'))) {
    await db.exec(`ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user';`)
  }

  if (!(await hasColumn(db, 'users', 'avatar_url'))) {
    await db.exec(`ALTER TABLE users ADD COLUMN avatar_url TEXT;`)
  }

  await db.exec(`
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      mode_id TEXT NOT NULL,
      topic_id TEXT NOT NULL,
      topic_label TEXT NOT NULL,
      question_count INTEGER NOT NULL DEFAULT 0,
      correct_answers INTEGER DEFAULT 0,
      percent INTEGER DEFAULT 0,
      points INTEGER DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'in_progress',
      started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      finished_at TEXT,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `)

  await db.exec(`
    CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id);
    CREATE INDEX IF NOT EXISTS idx_quiz_attempts_status ON quiz_attempts(status);
  `)
}

export async function getDb() {
  if (!dbPromise) {
    fs.mkdirSync(DATA_DIR, { recursive: true })

    dbPromise = open({
      filename: DB_FILE,
      driver: sqlite3.Database,
    }).then(async (db) => {
      await runMigrations(db)
      return db
    })
  }

  return dbPromise
}
