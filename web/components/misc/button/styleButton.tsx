import React from 'react';

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};

export default StyledButton;
