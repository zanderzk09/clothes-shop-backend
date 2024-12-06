import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  status: boolean;
  price: number;
  category: Schema.Types.ObjectId;
  description: string;
  availability: boolean;
  img: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    price: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    description: {
      type: String,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

const ProductModel = model<IProduct>('Product', ProductSchema);

export default ProductModel;

