import express from 'express';
import 'dotenv/config'
import productsRouter from './routers/products-router.js';

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded())
app.use(productsRouter);

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})