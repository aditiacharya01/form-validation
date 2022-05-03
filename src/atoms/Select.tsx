import React, { FC } from "react";
import styled from "styled-components";
import InputProps from "../interfaces/Input.types";
import Label from "./Label";

const StyledSelect = styled.select<InputProps>`
  height: 30px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #d8cccc;
  outline: 0;
`;

const Select: FC<InputProps> = ({
  field,
  form: { touched, errors },
  options,
  label,
  id,
  ...props
}) => (
  <div>
    <Label htmlFor={label} label={label}></Label>
    <StyledSelect {...field} {...props} data-testid={id}>
      {options?.map((item: string, index: number) => (
        <option key={index} value={item} data-testid={`${id}-option`}>
          {item}
        </option>
      ))}
    </StyledSelect>
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

export default Select;
