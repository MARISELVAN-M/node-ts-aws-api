import { Schema, model, Document } from 'mongoose';

// Define the structure interface
export interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

export const Product = model<IProduct>('Product', ProductSchema);
