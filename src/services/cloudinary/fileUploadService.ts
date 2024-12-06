import { IStorageProvider } from '../../interfaces/IStorageProvider';

export class FileUploadService {
  private storageProvider: IStorageProvider;

  constructor(storageProvider: IStorageProvider) {
    this.storageProvider = storageProvider;
  }

  async uploadFile(file: Buffer): Promise<string> {
    return await this.storageProvider.upload(file);
  }
}

