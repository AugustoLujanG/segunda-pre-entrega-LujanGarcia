import { Schema, model } from 'mongoose';

export const cartModel = model(
  'carts',
  new Schema({
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
          },
        },
      ],
      default: [],
    },
  })
);
