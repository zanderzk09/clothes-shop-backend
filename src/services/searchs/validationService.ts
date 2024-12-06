export class ValidationService {
  static validateSearchQuery(name: string): boolean {
    if (typeof name !== 'string' || name.trim() === '') {
      return false;
    }
    return true;
  }
}
