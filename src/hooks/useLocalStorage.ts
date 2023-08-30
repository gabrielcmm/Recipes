import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T | null) {
  const [data, setData] = useState<T>(() => {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return initialValue;
  });

  const setLocalStorage = (newData: T) => {
    localStorage.setItem(key, JSON.stringify(newData));
    const item = localStorage.getItem(key);
    if (item) {
      setData(JSON.parse(item));
    } else {
      setData(newData);
    }
  };

  return {
    data,
    setLocalStorage,
  };
}

export default useLocalStorage;
