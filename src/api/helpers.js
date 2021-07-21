class Helpers {
  constructor() {
    // this.url = 'https://week4-carloshdz.herokuapp.com';
    this.url = 'https://trainee-gamerbox.herokuapp.com';
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
    const url = `${this.url}/games/${id}/comments?_sort=id&_order=desc`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  }

  async postComment(data) {
    const url = `${this.url}/comments`;
    const response = await fetch(
      url,
      this.getConfig('POST', JSON.stringify(data)),
    );

    if (!response.ok) {
      throw new Error('Error');
    }

    return response.json();
  }
}

export default Helpers;
