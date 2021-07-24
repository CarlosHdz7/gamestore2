class Helpers {
  constructor() {
    this.url = process.env.REACT_APP_API_URL;
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

  async getGames() {
    const url = `${this.url}/games`;
    const resp = await fetch(url);
    const data = await resp.json();

    const games = data.map((game) => ({
      id: game.id,
      name: game.name,
      genre: game.genre?.name,
      releaseYear: game.release_year,
      price: game.price,
      urlImage: game.cover_art?.url,
    }));
    return games;
  }

  async getGameById(id) {
    const url = `${this.url}/games/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();

    const game = {
      id: data.id,
      name: data.name,
      genre: data.genre?.name,
      releaseYear: data.release_year,
      price: data.price,
      urlImage: data.cover_art?.url,
      comments: data.comments,
    };

    return game;
  }

  async getCommentsByGame(id) {
    const url = `${this.url}/games/${id}/comments?_limit=100&_sort=id&_order=asc`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  }

  async postComment(id, data, headers) {
    const url = `${this.url}/games/${id}/comment`;
    const response = await fetch(
      url,
      Helpers.getConfig('POST', JSON.stringify(data), headers),
    );

    if (!response.ok) {
      throw new Error('Error');
    }

    return response.json();
  }

  async postLogin(credentials) {
    const url = `${this.url}/auth/local`;
    const response = await fetch(
      url,
      Helpers.getConfig('POST', JSON.stringify(credentials)),
    );

    if (!response.ok) {
      throw new Error('Error');
    }

    const data = await response.json();

    const user = {
      id: data.user.id,
      jwt: data.jwt,
      username: data.user.username,
      email: data.user.email,
    };

    return user;
  }
}

export default Helpers;
