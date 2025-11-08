# 🌐 URL Shortener Backend (Node.js + Express + MySQL)

This is the **backend service** for the URL Shortener project.  
It provides secure REST APIs to shorten long URLs, redirect users, track clicks, and manage short links.

---

## 🧩 Tech Stack

- **Node.js + Express.js** – backend framework  
- **MySQL (XAMPP)** – database  
- **dotenv** – environment configuration  
- **helmet, morgan, compression, cors** – security & logging middlewares  
- **express-rate-limit** – protects against request flooding  
- **nanoid** – generates unique short IDs    

---

## ⚙️ Project Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/ajit432/Url-short-Node

2️⃣ Install dependencies
npm install

3️⃣ Configure .env

Create a .env file inside Node-BackEnd:

PORT=3000
APP_BASE_URL=http://localhost:3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=url_shortener

--------------------------
🧱 Folder Structure
Node-BackEnd/
├── server.js
├── .env
├── src/
│   ├── config/
│   │   ├── appConfig.js
│   │   └── db.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── v1/
│   │       ├── index.js
│   │       └── url.routes.js
│   ├── services/
│   │   └── urlService.js
│   └── utils/
│       ├── logger.js
│       └── routeLoader.js
└── logs/
    └── error.log

-------------------
🧰 API Endpoints
Method	Endpoint	Description
POST	/api/v1/url/shorten	Create a short URL
POST	/api/v1/url/list	Get the 10 most recent URLs
GET	/api/v1/url/:shortId	Redirect to the original URL
GET	/:shortId	(Clean URL) Redirect directly to original

Example:

POST /api/v1/url/shorten
{
  "originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}


Response:

{
  "shortUrl": "http://localhost:3000/es7BpS",
  "shortId": "es7BpS"
}

🧪 Run Locally
npm run dev


Server starts at:

http://localhost:3000

🧠 Features

✅ Shorten any valid URL
✅ Track total clicks
✅ Secure with Helmet, CORS, and Rate Limit
✅ Logs stored in /logs/error.log
✅ Global error handler
✅ Dynamic routing system
✅ Versioned API (v1, v2, etc.)