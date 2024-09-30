import express from 'express';
import { engine } from 'express-handlebars';
import 'dotenv/config'

const PORT = process.env.PORT;
const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'))

app.get("/", (_, res) => res.render("home"));
app.get("/about", (_, res) => res.render("about"));
app.get("/favourite-food", (_, res) => res.render("favourite-food"));

app.use(function(req, res, next) {
    res.status(404);
    res.render('404', { url: req.url });
  });

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})