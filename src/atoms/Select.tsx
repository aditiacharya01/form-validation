import React, { FC } from "react";
import styled from "styled-components";
import InputProps from "../interfaces/Input.types";

const StyledSelect = styled.select<InputProps>`
  height: 30px;
  width: 300px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #d8cccc;
  outline: 0;
`;

const Select: FC<InputProps> = ({
  field,
  form: { touched, errors },
  options,
  ...props
}) => (
  <div>
    <StyledSelect {...field} {...props}>
      {options?.map((item: string, index: number) => (
        <option key={index} value={item}>
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
