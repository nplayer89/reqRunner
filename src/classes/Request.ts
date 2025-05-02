
/**
 * Encapsulates an HTTP request: URL, method, and optional JSON body.
 */
export class Request {
  constructor(
    public url: string,
    public method: string = 'GET',
    public body?: Record<string, any>
  ) {}

  /**
   * Convert to Axios config.
   */
  public toConfig(): { url: string; method: string; data?: Record<string, any> } {
    return {
      url: this.url,
      method: this.method,
      data: this.body
    };
  }
}
