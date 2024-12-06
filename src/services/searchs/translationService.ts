export class TranslationService {
  private static translationDictionary: Record<string, string[]> = {
    "camisa": ["shirt"],
    "pantalón": ["pants", "trousers"],
    "zapatos": ["shoes"],
    "chaqueta": ["jacket"],
    "abrigo": ["coat"],
    "sudadera": ["hoodie"],
    "café": ["coffee"],
    "blanco": ["white"],
    "negro": ["black"]
  };

  getSearchTerms(term: string): string[] {
    const normalizedTerm = term
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    const translations = TranslationService.translationDictionary[normalizedTerm] || [];

    return [normalizedTerm, ...translations];
  }
}
