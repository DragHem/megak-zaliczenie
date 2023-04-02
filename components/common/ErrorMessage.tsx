import React from "react";

interface Props {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  return (
    // <div className="alert alert-error p-1 my-1">
    //   <p className="italic">{children}</p>
    // </div>

    <div className="badge badge-error gap-2">
      <p className="italic">{children}</p>
    </div>
  );
};

export default ErrorMessage;
