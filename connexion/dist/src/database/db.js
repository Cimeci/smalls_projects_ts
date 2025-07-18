// Configuration de la DB
const db = new Database('game.db');
// Création des tables
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    wallet INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cosmetics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_id TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('bar', 'ball', 'background')) NOT NULL,
    image_path TEXT NOT NULL,
    equipped BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
`);
export default db;
