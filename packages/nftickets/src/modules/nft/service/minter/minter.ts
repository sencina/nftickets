export interface Minter {
  mint(hash: string): Promise<string>;
}
