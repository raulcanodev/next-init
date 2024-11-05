'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { RadioGroup, RadioGroupItem, Label } from '@/components/ui/';
import { toast } from 'sonner'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative inline-flex items-center justify-center w-10 h-10 p-2 transition-all duration-300 focus:outline-none"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-transform duration-300 transform rotate-180" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 transform rotate-0" stroke="black" />
      )}
    </button>
  );
};

const OptionThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [localTheme, setLocalTheme] = useState(theme);

  useEffect(() => {
    setMounted(true);
    setLocalTheme(theme);
  }, [theme]);

  const handleChangeTheme = (newTheme: string) => {
    setLocalTheme(newTheme);
    setTheme(newTheme);
    if (newTheme === 'light') {
      toast.success('Noo! My eyes 🥺');
    } else {
      toast.success('Much better! 😎');
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <RadioGroup value={localTheme} onValueChange={handleChangeTheme}>
      {['light', 'dark'].map((themeOption) => (
        <div key={themeOption} className="flex items-center space-x-2">
          <RadioGroupItem
            value={themeOption}
            id={`theme-${themeOption}`}
          />
          <Label htmlFor={`theme-${themeOption}`} className="capitalize">
            {themeOption}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export { ThemeSwitcher, OptionThemeSwitcher };