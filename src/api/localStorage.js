class LocalStorage {
  static save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static read(key) {
    return JSON.parse(localStorage.getItem(key)) || {};
  }
}

export default LocalStorage;
