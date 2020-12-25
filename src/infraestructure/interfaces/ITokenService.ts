export interface ITokenService {          
    
    readTokenFromLocalStorage(): string | undefined;
    writeTokenToLocalStorage(token:string): void;
    isTokenValid(): boolean;
    getClaimFromToken(claim: string): string | undefined;
    getPayload(): any;
    removeToken(): void;

  }