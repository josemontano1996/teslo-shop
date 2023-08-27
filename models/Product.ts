import { IProduct } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose';

const productSchema = new Schema(
  {
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: '{VALUE} is not a supported size',
        },
        required: true,
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String, required: true }],
    title: { type: String, required: true },
    type: {
      type: String,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: '{VALUE} is not a supported type',
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} is not a supported gender',
      },
    },
  },
  { timestamps: true }
);

//TODO create index

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;
