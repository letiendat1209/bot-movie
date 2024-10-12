import { useState, useEffect, useRef } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Lấy giá trị từ localStorage hoặc sử dụng giá trị mặc định
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Lưu giá trị mới vào localStorage khi thay đổi
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export const useTimeout = () => {
  const timeoutRef = useRef();

  const set = (callback, delay) => {
    clear();
    timeoutRef.current = setTimeout(callback, delay);
  };

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => clear();
  }, []);

  return [set, clear];
};
