class Helpers {
  constructor() {
    this.url = `https://week4-carloshdz.herokuapp.com`;
  }

  getConfig(method, body, headers = {}) {
    return {
      method: method,
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

  getGames = async () => {
    const url = `${this.url}/games`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  };

  getGameById = async (id) => {
    const url = `${this.url}/games/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  };

  getCommentsByGame = async (id) => {
    const url = `${this.url}/games/${id}/comments?_sort=id&_order=desc`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  };

  postComment = async (data) => {
    const url = `${this.url}/comments`;
    const response = await fetch(
      url,
      this.getConfig('POST', JSON.stringify(data))
    );

    if (!response.ok) {
      throw new Error('Error');
    }

    return response.json();
  };
}

export default Helpers;
