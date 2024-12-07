import React from 'react';

export interface InputButtonProps {
  key?: string
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

const InputButton: React.FC<InputButtonProps> = ({ onClick, text, disabled = false }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}>
      {text}
    </button>
  );
};

export default InputButton;
