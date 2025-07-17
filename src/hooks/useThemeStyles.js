export const useThemeStyles = () => {
  return {
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      accent: 'text-[#915eff]',
    },
    bg: {
      primary: 'bg-gray-50',
      secondary: 'bg-gray-200',
      accent: 'bg-[#915eff]',
      card: 'bg-white',
      gradient: 'white-gradient',
    },
    border: {
      primary: 'border-gray-900',
      secondary: 'border-gray-300',
      accent: 'border-[#915eff]',
    },
    shadow: {
      card: 'shadow-lg',
      button: 'shadow-gray-200',
    },
    hover: {
      text: 'hover:text-gray-900',
      bg: 'hover:bg-gray-100',
      accent: 'hover:text-[#915eff]',
    },
  };
};
