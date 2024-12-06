export interface ISearchService {
  search(name: string): Promise<string[]>;
}
