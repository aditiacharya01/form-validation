import React, { FC } from "react";
import styled from "styled-components";
import InputProps from "../interfaces/Input.types";
import Label from "./Label";

const StyledInput = styled.input<InputProps>`
  height: 30px;
  width: 300px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #d8cccc;
  outline: 0;
`;

const Input: FC<InputProps> = ({
  field,
  form: { touched, errors },
  label,
  id,
  ...props
}) => (
  <div>
    <Label htmlFor={label} label={label}></Label>
    <StyledInput type="text" {...field} {...props} data-testid={id} />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

export default Input;
