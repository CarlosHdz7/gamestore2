class LocalStorage {
  static async save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static async read(key) {
    return JSON.parse(localStorage.getItem(key)) || {};
  }
}

export default LocalStorage;
