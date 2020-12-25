export interface IHttpClient {    
      
    getJsonResponse(url: string, headers: Map<string, string> | null, addToken: boolean | null): Promise<any>;

    delete(url: string, headers: Map<string, string> | null, addToken: boolean | null): Promise<any>;

    postJsonData(url: string, body: any, headers: Map<string, string> | null, addToken: boolean | null): Promise<any>;

    postNoBody(url: string, headers: Map<string, string> | null, addToken: boolean | null): Promise<any>

  }