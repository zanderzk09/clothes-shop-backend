import bcryptjs from 'bcryptjs';
import { User } from '../../models';

export class UserService {
  async getUsers(query: object, limit: number, since: number) {
    return await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(since).limit(limit)
    ]);
  }

  async createUser(userData: { name: string, email: string, password: string, role: string }) {
    const { name, email, password, role } = userData;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new Error('Email is not available');
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const user = new User({ name, email, password: hashedPassword, role });

    await user.save();
    return user;
  }

  async updateUser(id: string, userData: object) {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async deleteUser(id: string) {
    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
