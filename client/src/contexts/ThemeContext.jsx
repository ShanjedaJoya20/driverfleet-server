import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('drivefleet_theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('drivefleet_theme', dark ? 'dark' : 'light');
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const toggle = () => setDark((p) => !p);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
