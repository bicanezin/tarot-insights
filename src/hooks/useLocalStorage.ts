
"use client";

import { useState, useEffect } from 'react';

// Helper function to get value from localStorage or use initialValue
function getStoredValue<T>(key: string, initialValue: T | (() => T)): T {
  if (typeof window === 'undefined') {
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    // If item exists, parse it. Otherwise, use initialValue.
    // Ensure initialValue function is called if it's a function.
    return item ? JSON.parse(item) : (initialValue instanceof Function ? initialValue() : initialValue);
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    // Fallback to initialValue in case of error.
    return initialValue instanceof Function ? initialValue() : initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Initialize state from localStorage or initialValue.
  // This function (the initializer for useState) runs only once on mount.
  const [storedValue, setStoredValue] = useState<T>(() => 
    getStoredValue(key, initialValue)
  );

  // This useEffect handles:
  // 1. Initializing localStorage with initialValue if it's empty for the given key.
  // 2. Re-loading storedValue from localStorage if the `key` prop changes.
  // It depends only on `key`. `initialValue` is accessed via closure.
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      const currentInitialValue = initialValue instanceof Function ? initialValue() : initialValue;

      if (item) {
        // LocalStorage has a value for this key.
        // Ensure our React state (storedValue) is in sync.
        const parsedItem = JSON.parse(item);
        // Avoid unnecessary re-renders if the value is already the same (deep comparison via stringify).
        if (JSON.stringify(storedValue) !== JSON.stringify(parsedItem)) {
          setStoredValue(parsedItem);
        }
      } else {
        // LocalStorage is empty for this key.
        // 1. Set localStorage with the current initialValue.
        window.localStorage.setItem(key, JSON.stringify(currentInitialValue));
        // 2. Ensure React state (storedValue) reflects this initialValue.
        //    (This is important if the key changed and the new key has no LS entry).
        if (JSON.stringify(storedValue) !== JSON.stringify(currentInitialValue)) {
          setStoredValue(currentInitialValue);
        }
      }
    } catch (error) {
      console.warn(`Error synchronizing localStorage for key "${key}":`, error);
    }
  }, [key]); // Only re-run this effect if the 'key' changes.

  // Function to update both React state and localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    if (typeof window === 'undefined') {
      console.warn(`Tried to set localStorage key "${key}" on the server.`);
      return;
    }
    try {
      // Allow value to be a function like setState.
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Update React state.
      setStoredValue(valueToStore);
      // Update localStorage.
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
