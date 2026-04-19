const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// fetch pehle define karo
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// correct URL (docker ke liye)
const URL = process.env.BACKEND_URL || 'http://backend-service:5000/api';

app.get('/', async (req, res) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    console.log("Backend data:", data);

    res.render('index', { data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Ares listening on port 3000!');
});
