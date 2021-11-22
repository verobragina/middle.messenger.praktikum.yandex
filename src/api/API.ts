import HTTPTransport from './HTTPRequest';

const HTTP = new HTTPTransport();

export class API {
  get = (url: string, options?) => {
    return HTTP.get(url, options);
  }

  post = (url: string, options?) => {
    return HTTP.post(url, options);
  }

  put = (url: string, options?) => {
    return HTTP.put(url, options);
  }

  delete = (url: string, options?) => {
    return HTTP.delete(url, options);
  }
}
