export interface ITokenService {

  readToken(): string | null;
  writeToken(token: string): void;
  isTokenValid(): boolean;
  getClaimFromToken(claim: string): string | undefined;
  getPayload(): any;
  removeToken(): void;

}