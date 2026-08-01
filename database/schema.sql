CREATE TABLE IF NOT EXISTS wines (
  id SERIAL PRIMARY KEY,
  name TEXT,
  price REAL,
  year INTEGER,
  type TEXT,
  short_description TEXT,
  long_description TEXT,
  image TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  nome TEXT NOT NULL,
  cognome TEXT NOT NULL,
  admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS cart (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  wine_id INTEGER REFERENCES wines(id),
  quantity INTEGER
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  sent_date DATE NOT NULL DEFAULT CURRENT_DATE,
  sent_time TIME NOT NULL DEFAULT CURRENT_TIME
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  order_date DATE DEFAULT CURRENT_DATE,
  total_amount REAL DEFAULT 0.0
);

CREATE TABLE IF NOT EXISTS order_details (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  wine_id INTEGER REFERENCES wines(id),
  quantity INTEGER,
  price_per_unit REAL
);
