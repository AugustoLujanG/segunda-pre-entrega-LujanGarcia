import { Schema, model } from 'mongoose';

export const productModel = model(
  'products',
  new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 250 },
    category: { type: String, required: true, max: 50 },
    price: { type: Number, required: true },
    thumbnails: { type: String },
    code: { type: String, required: true, max: 50 },
    stock: { type: Number, required: true },
    status: { type: Boolean, required: true },
  })
);
