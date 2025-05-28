
"use client";

import { useState, useEffect } from 'react';

function getValue<T>(key: string, initialValue: T | (() => T)): T {
  if (typeof window === 'undefined') {
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : (initialValue instanceof Function ? initialValue() : initialValue);
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [storedValue, setStoredValue] = useState<T>(() => getValue(key, initialValue));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        } else {
           // If not in local storage, set it with initial value
          const valueToStore = initialValue instanceof Function ? initialValue() : initialValue;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          setStoredValue(valueToStore);
        }
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}" in useEffect:`, error);
      }
    }
  }, [key, initialValue]);
  

  const setValue = (value: T | ((val: T) => T)) => {
    if (typeof window === 'undefined') {
      console.warn(`Tried to set localStorage key "${key}" on the server.`)
      return;
    }
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
