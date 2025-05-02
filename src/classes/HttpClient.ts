// src/classes/HttpClient.ts

import axios, { AxiosResponse } from 'axios';
import { Request } from './Request';

/**
 * Wraps Axios to send a Request and return the response or error text.
 */
export class HttpClient {
  public async send(req: Request): Promise<string> {
    try {
      const res: AxiosResponse = await axios(req.toConfig());
      return JSON.stringify(res.data, null, 2);
    } catch (err: any) {
      return `Error: ${err.message}`;
    }
  }
}

