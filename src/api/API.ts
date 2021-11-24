import HTTPTransport from './HTTPRequest';

const HTTP = new HTTPTransport();

export class API {
  get = (url: string, options?) => HTTP.get(url, options);

  post = (url: string, options?) => HTTP.post(url, options);

  put = (url: string, options?) => HTTP.put(url, options);

  delete = (url: string, options?) => HTTP.delete(url, options);
}
