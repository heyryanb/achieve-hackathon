const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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
