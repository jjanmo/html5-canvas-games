import express from 'express';
import ejs from 'ejs';

const app = express();

const PORT = 3030;

app.set('views', `${process.cwd()}/src/views`);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static(`${process.cwd()}/src/public`));

app.get('/', (_, res) => res.render('home.html'));
app.get('/vampire', (_, res) => res.render('vampire.html'));

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
