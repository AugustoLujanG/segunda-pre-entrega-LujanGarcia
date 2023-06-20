import { cartModel } from "../DAO/models/carts.model.js";

class CartService {
  async getAll() {
    const carts = await cartModel.find({}).exec();
    const modifiedCart = carts.map((cart) => {
      const modifiedCart = cart.toObject();
      modifiedCart._id = product._id.toString();
      return modifiedCart;
    });
    return modifiedCart;
  }

  // async createProduct(newProd) {
  //   const productCreated = await productModel.create(newProd);
  //   return productCreated;
  // }

  // async deleteProduct(productId) {
  //   await productModel.deleteOne({ _id: productId }).exec();
  // }
}

export const cartService = new CartService();
