import { Schema, model, Document } from 'mongoose';

interface IRole extends Document {
  role: string;
}

const RoleSchema = new Schema<IRole>(
  {
    role: {
      type: String,
      required: [true, 'Role is required'],
      unique: true,
    },
  },
  {
    timestamps: true, 
  }
);

RoleSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject(); 
  return data;
};

const RoleModel = model<IRole>('Role', RoleSchema);

export default RoleModel;

