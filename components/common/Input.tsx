import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ErrorMessage from "./ErrorMessage";

//@todo typ register
interface Props {
  icon: IconProp;
  label: string;
  type?: string;
  placeholder: string;
  register: any;
  errorMessage: string | undefined;
}

const Input = ({
  icon,
  label,
  type,
  placeholder,
  register,
  errorMessage,
}: Props) => {
  return (
    <>
      <div>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <label className="input-group">
          <span>
            <FontAwesomeIcon icon={icon} className="text-primary" />
          </span>
          <input
            type={"text" && type}
            placeholder={placeholder}
            className="input input-bordered placeholder:opacity-50"
            {...register}
          />
        </label>
        <div className="flex justify-center m-2">
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
      </div>
    </>
  );
};

export default Input;
