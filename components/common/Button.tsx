import React from "react";

interface Props {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, primary, onClick, disabled }: Props) => {
  if (primary)
    return (
      <button
        className="btn btn-primary m-1"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );

  return (
    <button className="btn m-1" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
