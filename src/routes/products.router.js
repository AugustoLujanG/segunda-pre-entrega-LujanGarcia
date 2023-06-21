import express from 'express';
import { productService } from '../services/product.service.js';

export const productsRouter = express.Router();

// GET con limit

productsRouter.get('/', async (req, res) => {
  try {
    const queryParams = req.query;

    const products = await productService.getJson(queryParams);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET por ID

productsRouter.get('/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const productById = await productService.getById(id);

    if (productById) {
      res.status(200).render('home', { productById: [productById] });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
productsRouter.post('/', async (req, res) => {
  try {
    const product = req.body;
    await productManager.addProduct(product);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /:pid
productsRouter.put('/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    const updatedProduct = req.body;
    await productManager.updateProduct(parseInt(id), updatedProduct);
    res.json({ message: `Producto ${id} actualizado` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /:pid
productsRouter.delete('/:pid', async (req, res) => {
  try {
    const id = req.params.pid;
    productManager.deleteProduct(parseInt(id));
    res.json({ message: `Producto ${id} eliminado` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
