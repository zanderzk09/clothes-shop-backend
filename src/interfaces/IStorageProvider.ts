export interface IStorageProvider {
  upload(file: Buffer): Promise<string>;
}
