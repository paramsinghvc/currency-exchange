import React, { FC, useCallback } from "react";
import TextField, { ITextFieldProps } from "shared/components/TextField";

const CurrencyInput: FC<ITextFieldProps> = ({ onChange, ...props }) => {
  const validateInput = (val: string) => /^\d+(?:[\.\d]{0,3})$/.test(val);
  const handleChange = useCallback(
    e => {
      if (validateInput(e.target.value) || !e.target.value) {
        onChange(e);
      }
    },
    [onChange]
  );
  return <TextField {...props} onChange={handleChange} />;
};

export default CurrencyInput;
