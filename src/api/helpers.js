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
    const data = await singleton.getData(url, 'A error has ocurred while loading video games information.');
    const games = data.map((game) => ({
      id: game.id,
      name: game.name,
      price: game.price,
      urlImage: game.cover_art?.url,
    }));
    return games;
  }

  static async getGameById(id) {
    const url = `/games/${id}`;
    const data = await singleton.getData(url, 'A error has ocurred while loading video game information.');
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
    const data = await singleton.getData(url, 'A error has ocurred while loading comments.');
    return data;
  }

  static async postComment(id, data, headers) {
    const url = `/games/${id}/comment`;
    const response = await singleton.postData(url, data, headers);
    return response;
  }

  static async postLogin(credentials) {
    const url = '/auth/local';
    const dataUser = await singleton.postData(url, credentials);
    const user = {
      id: dataUser.user.id,
      jwt: dataUser.jwt,
      username: dataUser.user.username,
      email: dataUser.user.email,
    };
    return user;
  }
}

export default Helpers;
