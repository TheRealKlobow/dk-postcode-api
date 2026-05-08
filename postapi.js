const express = require('express');
const postcodes = require('./postcodes.json');
const app = express();
const PORT = 3000;

// Byg et omvendt lookup: bynavn -> [postnumre]
const cityMap = {};
for (const [zip, city] of Object.entries(postcodes)) {
  const key = city.toLowerCase();
  if (!cityMap[key]) cityMap[key] = [];
  cityMap[key].push({ zip, city });
}

// GET /v1/zip/:postnummer
app.get('/v1/zip/:zip', (req, res) => {
  const city = postcodes[req.params.zip];
  if (!city) return res.status(404).json({ error: 'Postnummer ikke fundet' });
  res.json({ zip: req.params.zip, city });
});

// GET /v1/city/:bynavn
app.get('/v1/city/:city', (req, res) => {
  const results = cityMap[req.params.city.toLowerCase()];
  if (!results) return res.status(404).json({ error: 'By ikke fundet' });
  res.json(results);
});

// GET /v1/search?q=
app.get('/v1/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) return res.status(400).json({ error: 'Mangler query parameter q' });
  
  const results = Object.entries(postcodes)
    .filter(([zip, city]) => city.toLowerCase().includes(q) || zip.includes(q))
    .map(([zip, city]) => ({ zip, city }));

  res.json(results);
});

// GET /v1/all
app.get('/v1/all', (req, res) => {
  const all = Object.entries(postcodes).map(([zip, city]) => ({ zip, city }));
  res.json(all);
});

app.listen(PORT, () => console.log(`PostAPI kører på port ${PORT}`));