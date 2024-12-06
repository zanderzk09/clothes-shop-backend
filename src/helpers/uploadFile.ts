import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface File {
  name: string;
  mv: (path: string, callback: (err: any) => void) => void;
}

export const uploadFile = (
  files: { [key: string]: File },
  validatedExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif'],
  folder: string = ''
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitName = file.name.split('.');
    const extension = splitName[splitName.length - 1];

    // Validate extension
    if (!validatedExtensions.includes(extension)) {
      return reject(`The extension ${extension} is not allowed. Allowed extensions: ${validatedExtensions.join(', ')}`);
    }

    const tempName = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      const relativePath = path.join(folder, tempName);
      resolve(relativePath);
    });
  });
};

