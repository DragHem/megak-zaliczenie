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
      <button className="btn btn-primary" disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button className="btn" disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
