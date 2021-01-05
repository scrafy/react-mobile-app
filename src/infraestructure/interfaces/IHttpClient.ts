export interface IHttpClient {

  getJsonResponse(url: string, headers: Map<string, string> | null, addToken: boolean | null): Promise<any>;

  tokenGetJsonResponse(url: string, headers: Map<string, string> | null, token:string): Promise<any>;

  delete(url: string, headers: Map<string, string> | null, addToken: boolean | null): Promise<any>;

  postJsonData(url: string, body: any, headers: Map<string, string> | null, addToken: boolean | null): Promise<any>;

  syncPostJsonData(url: string, body: any, headers: Map<string, string> | null, addToken: boolean | null): any;

  tokenPostJsonData(url: string, body: any, headers: Map<string, string> | null, token:string): Promise<any>;

  postNoBody(url: string, headers: Map<string, string> | null, addToken: boolean | null): Promise<any>

}