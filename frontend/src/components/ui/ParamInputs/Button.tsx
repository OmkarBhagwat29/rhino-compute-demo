import React, { FC } from "react";

interface ButtonProps {
  name: string;
  className?: string; // Accept additional custom className
  onClick?: () => void; // Optional onClick handler
}

const Button: FC<ButtonProps> = ({ name, className = "", onClick }) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`cursor-pointer animation-all duration-200 rounded-md break-words ${className}`} // Apply dynamic button styles with custom className
      onClick={handleOnClick}
      // Max width passed as a prop
    >
      {name}
    </button>
  );
};

export default Button;
