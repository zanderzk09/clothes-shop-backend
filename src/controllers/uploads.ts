import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import Product, { IProduct }  from '../models/product';
import { uploadFile } from '../helpers';
import { UploadedFile } from 'express-fileupload';

cloudinary.config(process.env.CLOUDINARY_URL!);

export const uploadFiles = async (req: Request, res: Response): Promise<void> => {
  if (!req.files || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }

  try {
    const relativePath = await uploadFile(req.files as { [key: string]: UploadedFile }, undefined, 'images');
    res.json({ url: `/uploads/${relativePath}` });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};


export const updateImage = async (req: Request, res: Response): Promise<void> => {
  const { id, collection } = req.params;

  let model: IProduct | null;

  switch (collection) {
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        res.status(400).json({ msg: `The product with id: ${id} does not exist` });
        return;
      }
      break;

    default:
      res.status(500).json({ msg: 'Validation pending for this collection' });
      return;
  }

  if (model.img) {
    const pathImage = path.join(__dirname, '../uploads', model.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  if (!req.files || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }

  const relativePath = await uploadFile(req.files as { [key: string]: UploadedFile }, undefined, collection);
  model.img = relativePath;

  await model.save();

  res.json(model);
};


export const showImage = async (req: Request, res: Response): Promise<void> => {
  const { id, collection } = req.params;

  let model: IProduct | null;

  switch (collection) {
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        res.status(400).json({ msg: `The product with id: ${id} does not exist` });
        return;
      }
      break;

    default:
      res.status(500).json({ msg: 'Validation pending for this collection' });
      return;
  }

  if (model?.img) {
    const pathImage = path.join(__dirname, '../uploads', model.img);

    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  const defaultImage = path.join(__dirname, '../assets/no-image.jpg');
  return res.sendFile(defaultImage);
};



export const updateCloudinaryImage = async (req: Request, res: Response): Promise<void> => {
  const { id, collection } = req.params;

  let model: IProduct | null;

  switch (collection) {
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        res.status(400).json({ msg: `The product with id ${id} could not be found` });
        return;
      }
      break;

    default:
      res.status(500).json({ msg: 'Validation pending for this collection' });
    return;
  }

  if (model.img) {
    const nameArr = model.img.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  if (!req.files || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }

  const { tempFilePath } = req.files.file as UploadedFile;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;

  await model.save();

  res.json(model);
};

