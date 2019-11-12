import React, { FC } from "react";
import styled from "@emotion/styled";
import theme from "shared/theme";

export type sizeType = "small" | "medium" | "large" | "x-large";

export type ITFProps = ITextFieldProps;

export interface ITextFieldProps extends React.HTMLProps<HTMLInputElement | HTMLTextAreaElement> {
  type?: string;
  id?: string;
  value: string | number;
  multiplelines?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  fullWidth?: boolean;
  error?: string | boolean;
  leftAdornment?: JSX.Element | string;
  rightAdornment?: JSX.Element | string;
  width?: number;
  paddingsize?: sizeType;
  className?: string;
}

const sizeMap = new Map<sizeType, string>([
  ["small", "5px 8px"],
  ["medium", "10px 10px"],
  ["large", "15px 15px"],
  ["x-large", "20px 15px"]
]);

const TextField = styled.div`
  display: inline-flex;
  font-size: 16px;
  border: 2px solid ${theme.borderColor};
  border-radius: ${theme.borderRadius};
  &:focus-within {
    border: 2px solid ${theme.primaryColor};
  }
`;

const InputBox = styled.input<Pick<ITextFieldProps, "paddingsize">>`
  background: none;
  padding: ${props => sizeMap.get(props.paddingsize!)};
  border: none;
  outline: none;
`;

const TextArea = styled.textarea<Pick<ITextFieldProps, "paddingsize">>`
  ${InputBox}
`;

const Adornment = styled.div<Pick<ITextFieldProps, "paddingsize">>`
  padding: ${props => sizeMap.get(props.paddingsize!)};
  &.left {
    border-right: 2px solid ${theme.borderColor};
  }
  &.right {
    border-left: 2px solid ${theme.borderColor};
  }
`;
const TextFieldComp: FC<ITFProps> = props => (
  <TextField {...(props as React.HTMLProps<HTMLDivElement>)}>
    {props.leftAdornment && (
      <Adornment className="left" paddingsize={props.paddingsize}>
        {props.leftAdornment}
      </Adornment>
    )}
    {props.multiplelines ? (
      <TextArea value={props.value} {...(props as React.HTMLProps<HTMLTextAreaElement>)} />
    ) : (
      <InputBox type={props.type} value={props.value} {...(props as React.HTMLProps<HTMLInputElement>)} />
    )}
    {props.rightAdornment && (
      <div className="right" css={Adornment}>
        {props.rightAdornment}
      </div>
    )}
  </TextField>
);

const defaultProps = {
  paddingsize: "large" as sizeType,
  value: "",
  onChange: () => {},
  type: "text"
};

TextFieldComp.defaultProps = defaultProps;

export default TextFieldComp;
