export interface Deployer {
  deploy(body: unknown[]): Promise<string>;
}
