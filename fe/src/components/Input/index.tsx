import React from "react";
import { Input, InputProps } from "antd";
import { PasswordProps, TextAreaProps } from "antd/es/input";

type BaseInputProps = {
  label?: string;
  errMessage?: string;
};

interface NormalInputProps extends BaseInputProps, InputProps {
  customType?: null;
}
interface PasswordInputProps extends BaseInputProps, PasswordProps {
  customType: "PASSWORD";
}
interface TextAreaInputProps extends BaseInputProps, TextAreaProps {
  customType: "TEXTAREA";
}

export type InputComponentProps =
  | NormalInputProps
  | PasswordInputProps
  | TextAreaInputProps;

const InputComponents: React.FC<InputComponentProps> = (
  props: InputComponentProps
) => {
  const { label, errMessage, customType } = props;

  const renderInput = () => {
    if (customType === "PASSWORD") {
      return <Input.Password {...props} />;
    }

    if (customType === "TEXTAREA") {
      return <Input.TextArea {...props} />;
    }

    return <Input {...props} />;
  };

  return (
    <div className="field-box">
      {label && <label htmlFor="label">{label}</label>}
      {renderInput()}
      {errMessage && <div className="err-message">{errMessage}</div>}
    </div>
  );
};

export default InputComponents;
