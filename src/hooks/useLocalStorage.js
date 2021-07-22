import { useState, useEffect } from 'react';

const useLocalStorageState = (key, defaultValue = {}) => {
  const [state, setState] = useState(
    () => window.localStorage.getItem(key) || JSON.parse(defaultValue),
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorageState;
