## Необхідне програмне забезпечення

- Git
- Node.js 20 або новішої версії (npm встановлюється разом із Node.js)
- Visual Studio Code або інший редактор коду
- Веббраузер (Chrome, Firefox або Edge)
- Postman — для перевірки API-запитів

## Порядок запуску

1. Відкрити PowerShell або термінал Visual Studio Code.
2. Клонувати репозиторій:
   ```powershell
   git clone https://github.com/paunnil/minisklad-lab1.git
   ```
3. Перейти до папки серверної частини:
   ```powershell
   cd minisklad-lab1\backend
   ```
4. Встановити залежності:
   ```powershell
   npm install
   ```
5. Запустити сервер:
   ```powershell
   npm start
   ```
6. Відкрити в браузері адресу, зазначену в повідомленні сервера (за замовчуванням — http://localhost:3000).
7. Перевірити отримання списку товарів за адресою `http://localhost:3000/api/products` (якщо порт змінено, використати відповідний порт).
8. Для зупинки сервера натиснути `Ctrl+C` у терміналі.
