import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

router.post('/', (req,res) => {
    //Handle POST request to create a new cart
    const newCart = req.body;
    const cart = cartManager.createCart(newCart);
    res.json(cart);
});

router.get('/:cid', (req,res) =>{
    //Handle GET request to get products in a specific cart.
    const cartId = req.params.cid;
    const products = cartManager.getCartById(cartId);

    if(!products) {
        res.status(404).json({error: 'Cart not found'});
    } else {
        res.json(products);
    }
});

router.post('/:cid/product/:pid', (req,res) => {
    //Handle POST request to add a product to a cart.
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    const product = cartManager.addProductToCart(cartId, productId, quantity);

    if(!product) {
        res.status(404).json({error: 'Product or cart not found'});
    } else {
        res.json(product);
    }
});

router.delete('/:cartId/products/:productId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const result = await cartManager.deleteProductFromCart(cartId, productId);

        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Cart or product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;