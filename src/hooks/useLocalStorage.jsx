import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue = {}) => {
  const [state, setState] = useState(() => {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue) {
        return JSON.parse(localStorageValue);
      } else {
        initialValue && localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      console.error('error setting localStorage');
    }
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorage;
