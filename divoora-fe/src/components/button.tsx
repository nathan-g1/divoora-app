import React from 'react';

interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ text, className, onClick }) => {
  return <button onClick={onClick} className={className}>{text}</button>;
};

export default Button;
