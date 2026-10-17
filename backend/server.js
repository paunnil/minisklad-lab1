// Мінісклад — навчальний backend (Node.js + Express).
// ЛР №1: дані зберігаються у звичайному масиві, без бази даних.

const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

// Знадобиться в ЛР №2, коли frontend і backend працюватимуть на різних портах.
// У ЛР №1 сторінка й API мають одну адресу, тому CORS фактично не потрібен.
app.use((req, res, next) => {
  const allowedOrigin = "http://localhost:8080";
  if (req.headers.origin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Невеликий набір початкових товарів.
// Поле photoUrl передбачене для ЛР №8 (хмарне сховище фотографій).
let products = [
  { id: 1, name: "Комп'ютерна миша", quantity: 12, price: 249, photoUrl: null },
  { id: 2, name: "Клавіатура", quantity: 4, price: 599, photoUrl: null },
  { id: 3, name: "USB-накопичувач 64 ГБ", quantity: 18, price: 329, photoUrl: null },
  { id: 4, name: "Вебкамера", quantity: 2, price: 1290, photoUrl: null }
];
let nextId = 5;

// Простий маршрут для перевірки стану API.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "minisklad-api" });
});

// GET /api/products — отримати список товарів.
app.get("/api/products", (req, res) => {
  res.json(products);
});

// POST /api/products — додати товар до масиву.
app.post("/api/products", (req, res) => {
  const { name, quantity, price } = req.body || {};

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 60) {
    return res.status(400).json({ error: "Назва товару повинна містити від 2 до 60 символів." });
  }
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > 100000) {
    return res.status(400).json({ error: "Кількість повинна бути цілим невід’ємним числом до 100000." });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price < 0 || price > 10000000) {
    return res.status(400).json({ error: "Ціна повинна бути невід’ємним числом до 10000000." });
  }

  const product = {
    id: nextId++,
    name: name.trim(),
    quantity,
    price: Math.round((price + Number.EPSILON) * 100) / 100,
    photoUrl: null
  };

  products.push(product);
  return res.status(201).json(product);
});

// У ЛР №1 Express також віддає готові HTML/CSS/JS frontend.
const frontendDirectory = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendDirectory));

app.use("/api", (req, res) => {
  res.status(404).json({ error: "Такого API-маршруту не існує." });
});

// Явне повідомлення про помилку, наприклад при некоректному JSON.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Некоректний формат JSON." });
  }
  console.error(err);
  res.status(500).json({ error: "Внутрішня помилка сервера." });
});

// 0.0.0.0 дозволить пізніше запускати цей самий сервер у Docker.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Мінісклад: http://localhost:${PORT}`);
  console.log(`REST API:  http://localhost:${PORT}/api/products`);
});
