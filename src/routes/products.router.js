import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
    try {
      const products = await productManager.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.post ('/', async (req,res) => {
    try {
        const newProduct = req.body;
        const createdProduct = await productManager.addProduct(newProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({error: 'Bad request'});
    }
});

router.get('/:pid', async (req, res) => {
    try {
      const productId = req.params.pid;
      const product = await productManager.getProductById(productId);
  
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:pid', async (req,res) => {
    try {
        const productId = req.params.pid;
        const updatedProductData = req.body;
        const updatedProduct = await productManager.updateProduct(productId, updatedProductData);

        if (!updatedProduct) {
            res.status(404).json({error: 'Product not found'});
        } else {
            res.json(updatedProduct);
        }
    } catch (error) {
        res.status(400).json({error: 'Bad request'});
    }
});

router.delete('/:pid', async (req, res) => {
    try {
      const productId = req.params.pid;
      const deletedProduct = await productManager.deleteProduct(productId);
  
      if (!deletedProduct) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(deletedProduct);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;