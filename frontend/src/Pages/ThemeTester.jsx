import React, { useEffect, useState } from 'react';

const ThemeTester = () => {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');

  useEffect(() => {
    const handleThreeFingerTap = (event) => {
      if (event.touches.length === 3) {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
      }
    };

    window.addEventListener('touchstart', handleThreeFingerTap);

    return () => {
      window.removeEventListener('touchstart', handleThreeFingerTap);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Current Theme: {theme}</h1>
      <p className="mt-4 text-lg">Tap with three fingers anywhere on the screen to toggle the theme.</p>
    </div>
  );
};

export default ThemeTester;