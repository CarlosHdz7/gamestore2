import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue = {}) => {
  const [storage, setStorage] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) || defaultValue,
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storage));
  }, [storage, key]);

  return [storage, setStorage];
};

export default useLocalStorage;
