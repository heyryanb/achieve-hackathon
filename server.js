const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit'); // P4424
const app = express();
const port = 3000;

const limiter = rateLimit({ // Pa2e5
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter); // P491b

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'styles.css'));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'app.js'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
