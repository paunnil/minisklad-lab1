# Мінісклад — навчальний клієнт-серверний вебзастосунок

**Дисципліна:** «Хмарні сервіси і технології»  
**Лабораторна робота №1:** створення та локальне тестування frontend/backend.

Це **повністю готова викладацька версія** застосунку для обліку товарів. Вона навмисно проста: звичайні HTML, CSS, JavaScript і Node.js + Express без React, Docker та бази даних. Docker з'явиться у ЛР №2, хмарні сервіси — пізніше.

## Що вміє застосунок

- показувати товари, отримані через REST API (`GET /api/products`);
- додавати товари через REST API (`POST /api/products`);
- обчислювати загальну кількість одиниць і вартість товарів;
- позначати товари з малим залишком (менше 5 шт.);
- шукати товари за назвою та фільтрувати малий залишок;
- показувати заглушку фотографії (поле `photoUrl` уже передбачено для ЛР №8).

**Важливо:** у ЛР №1 товари зберігаються в оперативній пам'яті Node.js (масив). Після перезапуску сервера додані товари зникнуть. Це передбачено: постійне зберігання додамо в ЛР №5 із Cloudflare D1.

## Вимоги

- Windows 10/11, macOS або Linux;
- Node.js **20 або новіший** і npm;
- браузер (Chrome / Firefox / Edge);
- доступ до інтернету **лише для першого `npm install`**.

## Запуск на Windows (PowerShell)

1. Розпакуйте архів `minisklad-lab1.zip`.
2. Відкрийте PowerShell у папці проєкту.
3. Виконайте:

```powershell
cd backend
npm install
npm start
```

4. Відкрийте **http://localhost:3000**.
5. Перевірте API: **http://localhost:3000/api/products**.

Зупинити сервер: `Ctrl + C` у PowerShell.  
Для розробки з автоматичним перезапуском backend: `npm run dev`.

> Якщо PowerShell забороняє виконання `npm.ps1`, спробуйте в командному рядку `cmd.exe` команди `cd backend`, `npm install`, `npm start` або скористайтеся `npm.cmd` у PowerShell. Змінювати політику безпеки Windows для цього не потрібно.

## Структура проєкту

```text
minisklad-lab1/
├── frontend/
│   ├── index.html                 # сторінка застосунку
│   ├── styles.css                 # стилі інтерфейсу
│   ├── app.js                     # робота з API та логіка інтерфейсу
│   ├── config.js                  # адреса API / деморежим
│   ├── demo-data.js               # тестові дані для ЛР №3
│   └── assets/
│       └── product-placeholder.svg
├── backend/
│   ├── package.json              # залежність Express та команди npm
│   └── server.js                 # HTTP API + видавання frontend-файлів
├── .gitignore
├── README.md
└── TEACHER_NOTES.md
```

## Як працює ЛР №1

```text
Браузер (localhost:3000)
      │
      ├── GET /               → Express віддає HTML/CSS/JS
      ├── GET /api/products   → Express повертає JSON-масив товарів
      └── POST /api/products  → Express додає товар у масив
```

Для цієї ЛР **не потрібен окремий frontend-сервер**: Express віддає файли з папки `frontend`.

## Тестування API через Postman

**GET:** `http://localhost:3000/api/products`  
Очікування: HTTP `200`, JSON-масив із 4 товарами.

**POST:** `http://localhost:3000/api/products`  
Заголовок: `Content-Type: application/json`  
Тіло запиту:

```json
{
  "name": "USB-хаб",
  "quantity": 3,
  "price": 450
}
```

Очікування: HTTP `201`, об'єкт нового товару з `id`.

**GET:** `http://localhost:3000/api/health`  
Очікування: HTTP `200`, `{ "status": "ok", "service": "minisklad-api" }`.

Спробуйте надіслати кількість `-2` — сервер поверне HTTP `400` із повідомленням про помилку.

## Заплановане розширення у наступних роботах

| ЛР | Що змінюємо |
| --- | --- |
| №2 | Окремо контейнеризуємо `frontend` (Node.js + `serve`) і `backend` (Express). Для frontend змінюємо `config.js`: `apiBaseUrl: "http://localhost:3000"`. Frontend відкриватиметься на `http://localhost:8080`, тому в Express уже додано просту CORS-конфігурацію для цієї адреси. |
| №3 | Публікуємо `frontend` через Cloudflare Pages, тимчасово встановлюємо в `config.js` `demoMode: true` (статичний деморежим). |
| №4 | Реалізуємо аналог REST API у Cloudflare Workers, в `config.js` зазначаємо URL Worker і вимикаємо деморежим. Налаштовуємо CORS Worker. |
| №5 | Створюємо Cloudflare D1, зберігаємо товари в SQL-таблиці замість масиву. |
| №6 | Додаємо `PUT` і `DELETE` до хмарного API, реалізуємо повний CRUD. |
| №7 | Розширюємо frontend кнопками редагування/видалення, підключаємо всі CRUD-операції, доповнюємо CORS. |
| №8 | Додаємо завантаження фотографій у Supabase Storage, записуємо `photoUrl` у D1 та показуємо фото у списку. |

## Обмеження навчальної версії

- Немає авторизації та розмежування доступу — **не публікуйте API із відкритим записом як виробничий сервіс**.
- У ЛР №1 немає SQL і постійного зберігання.
- У ЛР №1 немає `PUT`/`DELETE`: ці методи додамо у ЛР №6.
- Завантаження фото ще відсутнє — це завдання ЛР №8.
- Після ЛР №4 серверну реалізацію потрібно **адаптувати до Cloudflare Workers**: Docker-образ Express напряму в Workers не розгортають.
