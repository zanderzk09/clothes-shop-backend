import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN_ROLE' | 'USER_ROLE';
  status: boolean;
  _id: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      default: 'USER_ROLE',
      enum: ['ADMIN_ROLE', 'USER_ROLE'], 
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, 
  }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id; 
  return user;
};

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;

