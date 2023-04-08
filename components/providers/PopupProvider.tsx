import React, { createContext, useState, useContext } from "react";

type PopupContext = {
  message: string | undefined;
  status: string | undefined;
  triggerPopup: (text: string | undefined, status: string | undefined) => void;
  clearPopup: () => void;
};

interface Props {
  children: React.ReactNode;
}

const popupContextDefault: PopupContext = {
  message: undefined,
  status: undefined,
  triggerPopup: (text: string | undefined, status: string | undefined) => {},
  clearPopup: () => {},
};

const PopupContext = createContext<PopupContext>(popupContextDefault);

export const PopupProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const triggerPopup = async (
    text: string | undefined,
    status: string | undefined
  ) => {
    setMessage(text);
    setStatus(status);
  };
  const clearPopup = () => {
    setMessage(undefined);
    setStatus(undefined);
  };

  return (
    <PopupContext.Provider
      value={{ message, triggerPopup, clearPopup, status }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
