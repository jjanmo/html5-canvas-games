const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

const PORT = 3030;

app.set('views', `${process.cwd()}/src/views`);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static(`${process.cwd()}/dist`));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'dist', 'home.html')));
app.get('/vampire', (_, res) => res.sendFile(path.join(__dirname, 'dist', 'vampire.html')));

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
