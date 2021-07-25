let instance = null;

class Singleton {
  constructor(BASE_URL) {
    if (!instance) {
      instance = this;
    }

    this.url = BASE_URL;

    return instance;
  }

  static getConfig(method, body, headers = {}) {
    return {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body,
    };
  }

  async getData(endpoint = '', message = 'A error has ocurred') {
    const response = await fetch(`${this.url}${endpoint}`);

    if (!response.ok) {
      throw new Error(message);
    }

    const data = await response.json();
    return data;
  }

  async postData(endpoint = '', data = {}, headers, message = 'A error has ocurred') {
    const response = await fetch(`${this.url}${endpoint}`,
      Singleton.getConfig('POST', JSON.stringify(data), headers));

    if (response.statusCode && response.statusCode !== 200) {
      throw new Error(message);
    }

    return response.json();
  }
}

export default Singleton;
