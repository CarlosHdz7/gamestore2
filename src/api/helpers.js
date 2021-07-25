import Singleton from './singleton';

const singleton = new Singleton(process.env.REACT_APP_API_URL);
class Helpers {
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

  static async getGames() {
    const url = '/games';
    const data = await singleton.getData(url);
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

  static async getGameById(id) {
    const url = `/games/${id}`;
    const data = await singleton.getData(url);
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

  static async getCommentsByGame(id) {
    const url = `/games/${id}/comments?_limit=100&_sort=id&_order=asc`;
    const data = await singleton.getData(url);
    return data;
  }

  static async postComment(id, data, headers) {
    const url = `/games/${id}/comment`;
    const response = await singleton.postData(url, data, headers);
    return response;
  }

  static async postLogin(credentials) {
    const url = '/auth/local';
    const data = await singleton.postData(url, credentials);
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
