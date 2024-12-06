import { Request, Response } from 'express';
import { UserService } from '../services/users';
import bcryptjs from 'bcryptjs';

const userService = new UserService();

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 5, since = 0 } = req.query;
    const query = { status: true };
    const [total, users] = await userService.getUsers(query, Number(limit), Number(since));

    res.status(200).json({ total, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error retrieving users' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    const user = await userService.createUser({ name, email, password, role });

    res.status(201).json({
      msg: 'User created successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { password, ...rest } = req.body;

    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      rest.password = bcryptjs.hashSync(password, salt);
    }

    const updatedUser = await userService.updateUser(id, rest);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error updating user' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);

    res.status(200).json({ msg: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error deleting user' });
  }
};

export const patchUser = (req: Request, res: Response): void => {
  res.status(403).json({
    msg: 'Patch operation not allowed',
  });
};



