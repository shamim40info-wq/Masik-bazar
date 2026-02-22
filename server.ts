import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("masikbajar.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    originalPrice REAL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    unit TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerName TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    total REAL NOT NULL,
    items TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed initial settings if empty
const settingsCount = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
if (settingsCount.count === 0) {
  const initialSettings = [
    ['site_title', 'masikbajar.com - আপনার মাসিক বাজারের বিশ্বস্ত সঙ্গী'],
    ['site_logo', ''], // Base64 or URL
    ['site_favicon', ''],
    ['contact_phone', '০১৭XXXXXXXX'],
    ['contact_email', 'info@masikbajar.com'],
    ['contact_address', 'ঢাকা, বাংলাদেশ'],
    ['tracking_code', '']
  ];

  const insertSetting = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
  for (const s of initialSettings) {
    insertSetting.run(...s);
  }
}

// Seed initial products if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const initialProducts = [
    ['মিনিকেট চাল (প্রিমিয়াম)', 3450, 3600, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400', 'rice-dal', '৫০ কেজি'],
    ['মসুর ডাল (দেশি)', 140, null, 'https://images.unsplash.com/photo-1585994192701-11ca5083467a?auto=format&fit=crop&q=80&w=400', 'rice-dal', '১ কেজি'],
    ['রূপচাঁদা সয়াবিন তেল', 890, 920, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400', 'oil-spice', '৫ লিটার'],
    ['রাঁধুনী গুড়া মরিচ', 120, null, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400', 'oil-spice', '২০০ গ্রাম'],
    ['লাক্স সাবান (সফট টাচ)', 75, null, 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400', 'cleaning', '১০০ গ্রাম'],
    ['হুইল পাউডার', 110, null, 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&q=80&w=400', 'cleaning', '১ কেজি'],
    ['ডানো ফুল ক্রিম মিল্ক পাউডার', 850, 880, 'https://images.unsplash.com/photo-1550583724-125581cc2532?auto=format&fit=crop&q=80&w=400', 'grocery', '৫০০ গ্রাম'],
    ['চিনি (সাদা)', 135, null, 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=400', 'grocery', '১ কেজি']
  ];

  const insert = db.prepare("INSERT INTO products (name, price, originalPrice, image, category, unit) VALUES (?, ?, ?, ?, ?, ?)");
  for (const p of initialProducts) {
    insert.run(...p);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Auth API
  app.post("/api/admin/login", (req, res) => {
    const { email, password } = req.body;
    // For demo, we'll allow any login with password 'admin123'
    // In real app, check against DB
    if (password === "admin123") {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "ভুল ইমেইল বা পাসওয়ার্ড" });
    }
  });

  app.post("/api/admin/signup", (req, res) => {
    const { name, email, password } = req.body;
    // For demo, just return success
    res.json({ success: true });
  });

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const { name, price, originalPrice, image, category, unit } = req.body;
    db.prepare(`
      INSERT INTO products (name, price, originalPrice, image, category, unit)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, price, originalPrice, image, category, unit);
    res.json({ success: true });
  });

  app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, originalPrice, image, category, unit } = req.body;
    db.prepare(`
      UPDATE products 
      SET name = ?, price = ?, originalPrice = ?, image = ?, category = ?, unit = ?
      WHERE id = ?
    `).run(name, price, originalPrice, image, category, unit, id);
    res.json({ success: true });
  });

  app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM products WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.post("/api/orders", (req, res) => {
    const { customerName, phone, address, total, items } = req.body;
    db.prepare(`
      INSERT INTO orders (customerName, phone, address, total, items)
      VALUES (?, ?, ?, ?, ?)
    `).run(customerName, phone, address, total, JSON.stringify(items));
    res.json({ success: true });
  });

  app.get("/api/orders", (req, res) => {
    const orders = db.prepare("SELECT * FROM orders ORDER BY createdAt DESC").all();
    res.json(orders);
  });

  app.put("/api/orders/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
    res.json({ success: true });
  });

  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsMap = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  });

  app.post("/api/settings", (req, res) => {
    const settings = req.body;
    const update = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    for (const [key, value] of Object.entries(settings)) {
      update.run(key, value);
    }
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist/index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
