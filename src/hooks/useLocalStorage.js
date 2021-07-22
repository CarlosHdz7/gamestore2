import { useState, useEffect } from 'react';

const useLocalStorageState = (key, defaultValue = {}) => {
  const [storage, setStorage] = useState(
    () => window.localStorage.getItem(key) || defaultValue,
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storage));
  }, [storage, key]);

  return [storage, setStorage];
};

export default useLocalStorageState;
