export interface ITokenService {

  readToken(): string | null;
  writeToken(token: string | null): void;
  isTokenValid(token?: string): boolean;
  getClaimFromToken(claim: string, token?:string): string | undefined;
  getPayload(): any;
  removeToken(): void;

}