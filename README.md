# 🇩🇰 dk-postcode-api

![License](https://img.shields.io/badge/License-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![Express](https://img.shields.io/badge/Express-4-lightgrey)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux-blue)

A simple, lightweight REST API for looking up Danish postcodes and cities. Built with Node.js and Express.

---

## 📦 Features

- Look up city by postcode
- Look up postcodes by city name
- Fuzzy search across both postcodes and city names
- Get all Danish postcodes in one request
- Zero dependencies except Express

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/TheRealKlobow/dk-postcode-api.git
cd dk-postcode-api
npm install
```

### Running

```bash
node postapi.js
```

API is now running on `http://localhost:3000`

---

## 📡 Endpoints

### Get city by postcode
```
GET /v1/zip/:postcode
```
```json
GET /v1/zip/9000

{
  "zip": "9000",
  "city": "Aalborg"
}
```

---

### Get postcodes by city name
```
GET /v1/city/:cityname
```
```json
GET /v1/city/aalborg

[
  { "zip": "9000", "city": "Aalborg" },
  { "zip": "9200", "city": "Aalborg SV" },
  { "zip": "9210", "city": "Aalborg SØ" }
]
```

---

### Search by postcode or city
```
GET /v1/search?q=:query
```
```json
GET /v1/search?q=aal

[
  { "zip": "9000", "city": "Aalborg" },
  { "zip": "9200", "city": "Aalborg SV" },
  { "zip": "9620", "city": "Aalestrup" }
]
```

---

### Get all postcodes
GET /v1/all
Returns a full list of all Danish postcodes and their corresponding cities.

---

## 🛠️ Self-hosting

You can easily run this behind a reverse proxy like Nginx or Cloudflare Tunnel.

Example Nginx config:
```nginx
location /api/ {
    proxy_pass http://localhost:3000/;
}
```

---

## 📁 Project Structure
dk-postcode-api/
├── postapi.js        # Main API server
├── postcodes.json    # Danish postcode dataset
├── package.json
└── README.md

---

## 📄 License

MIT — free to use, modify and distribute.

---

Made with ☕ by [TheRealKlobow](https://github.com/TheRealKlobow)
