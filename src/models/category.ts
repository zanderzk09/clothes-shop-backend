import { Schema, model, Document, Types } from 'mongoose';


interface ICategory extends Document {
  name: string;
  status: boolean;
  _id: Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

const CategoryModel = model<ICategory>('Category', CategorySchema);

export default CategoryModel;

