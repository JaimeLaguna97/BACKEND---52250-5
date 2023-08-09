import express from 'express';
import { connect } from 'mongoose';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import notFoundHandler from '../middlewares/notFoundHandler.js';
import errorHandler from '../middlewares/errorHandler.js';

const PORT = 8080;

const ready = () => {
    console.log('Server ready on port '+PORT);
    connect('mongodb+srv://jaime:1234@cluster0.oxrx2ha.mongodb.net/PCbuilders')
        .then(() => console.log('database connected'))
        .catch((err => console.log((err))));
};
const app = express();

//MIDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//ROUTER
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//ERROR HANDLERS
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, ready);

