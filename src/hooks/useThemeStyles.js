import { useTheme } from '../context/ThemeContext';

export const useThemeStyles = () => {
  const { isDark } = useTheme();

  return {
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-secondary' : 'text-gray-600',
      accent: 'text-[#915eff]',
    },
    bg: {
      primary: isDark ? 'bg-primary' : 'bg-gray-50',
      secondary: isDark ? 'bg-secondary' : 'bg-gray-200',
      accent: 'bg-[#915eff]',
      card: isDark ? 'bg-tertiary' : 'bg-white',
      gradient: isDark ? 'black-gradient' : 'white-gradient',
    },
    border: {
      primary: isDark ? 'border-white' : 'border-gray-900',
      secondary: isDark ? 'border-secondary' : 'border-gray-300',
      accent: 'border-[#915eff]',
    },
    shadow: {
      card: isDark ? 'shadow-card' : 'shadow-lg',
      button: isDark ? 'shadow-primary' : 'shadow-gray-200',
    },
    hover: {
      text: isDark ? 'hover:text-white' : 'hover:text-gray-900',
      bg: isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100',
      accent: 'hover:text-[#915eff]',
    },
  };
};
