import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {

  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored === null || stored === "undefined") return initialValue;
      return JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  function setStoredValue(newValue) {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  useEffect(() => {

    function handleStorageChange(event) {
      if (event.key === key) {
        try {
          const val = event.newValue;
          if (val === null || val === "undefined") {
            setValue(initialValue);
          } else {
            setValue(JSON.parse(val));
          }
        } catch {
          setValue(initialValue);
        }
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);

  }, [key, initialValue]);

  return [value, setStoredValue];

}

export default useLocalStorage;