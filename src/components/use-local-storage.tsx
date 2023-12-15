"use client";

import { Dispatch, SetStateAction, useEffect, useState } from 'react';


export function useLocalStorage<Type> (key: string, defaultValue: Type): [Type, Dispatch<SetStateAction<Type>>] {
  const [value, setValue] = useState(() => (getStoredValue(key, localStorage) || defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function getStoredValue (key: string, store: Storage) {
  const saved = store.getItem(key);
  if (!saved) return;
  return JSON.parse(saved);
}
