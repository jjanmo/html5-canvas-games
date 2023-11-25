import express from 'express';
import ejs from 'ejs';

const app = express();

const PORT = 3030;

app.set('views', `${process.cwd()}/src`);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.get('/', (req, res) => res.render('home.html'));
app.get('/vampire', (req, res) => res.render('vampire/index.html'));

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
