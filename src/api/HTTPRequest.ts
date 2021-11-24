import {BaseURL, Methods} from '../constants/constants';

type TData = { [key: string]: any };

interface IOptions {
  method?: string;
  timeout?: number;
  headers?: Record<string, string>;
  data?: TData;
}

function queryStringify(data: TData) {
  if (typeof data !== 'object' && !data) {
    throw new Error('Data must be object!');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) =>
    `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export default class HTTPTransport {
  _baseURL: string

  constructor() {
    this._baseURL = BaseURL.URL;
  }

  public get = (url: string, options: IOptions = {}) => {
    return this.request(url, {...options, method: Methods.GET}, options.timeout);
  }

  public post = (url: string, options: IOptions = {}) => {
    return this.request(url, {...options, method: Methods.POST}, options.timeout);
  }

  public put = (url: string, options: IOptions = {}) => {
    return this.request(url, {...options, method: Methods.PUT}, options.timeout);
  }

  public delete = (url: string, options: IOptions = {}) => {
    return this.request(url, {...options, method: Methods.DELETE}, options.timeout);
  }

  private request = (url: string, options: IOptions = {}, timeout: number = 5000) => {
    const {method, headers = {}, data} = options;
    url = `${this._baseURL}${url}`;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method provided'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };

      xhr.responseType = 'json';
      xhr.withCredentials = true;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        }
      }
    });
  };
}

