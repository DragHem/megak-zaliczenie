import React from "react";
import { SignupResponseStatus } from "../../interfaces/signup/signup";

interface Props {
  message?: string;
  status?: SignupResponseStatus;
}

const Toast = ({ message, status }: Props) => {
  switch (status) {
    case "error":
      return (
        <div className="fixed top-0 w-screen h-screen bg-zinc-950 bg-opacity-80">
          <div className="toast toast-center toast-middle w-1/2">
            <div className="justify-center alert alert-error">
              <div>
                <p className="text-center">{message}</p>
              </div>
            </div>
          </div>
        </div>
      );
    case "success":
      return (
        <div className="fixed top-0 w-screen h-screen bg-zinc-950 bg-opacity-80">
          <div className="toast toast-center toast-middle w-1/2">
            <div className="justify-center alert alert-success">
              <div>
                <p className="text-center">{message}</p>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default Toast;
