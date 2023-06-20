import { productModel } from '../DAO/models/products.model.js';

class ProductService {
  async getAll() {
    const products = await productModel.find({}).exec();
    const modifiedProduct = products.map(product => {
      const modifiedProduct = product.toObject();
      modifiedProduct._id = product._id.toString();
      return modifiedProduct;
    });
    return modifiedProduct;
  }

  async createProduct(newProd) {
    const productCreated = await productModel.create(newProd);
    return productCreated;
  }

  async deleteProduct(productId) {
    await productModel.deleteOne({ _id: productId }).exec();
  }
}

export const productService = new ProductService();
