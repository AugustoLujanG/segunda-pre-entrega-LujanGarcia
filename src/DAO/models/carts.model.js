import { Schema, model } from "mongoose";

export const cartModel = model(
  "carts",
  new Schema({
    id: { type: Number, required: true },
    products: [
      {
        id: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  })
);
