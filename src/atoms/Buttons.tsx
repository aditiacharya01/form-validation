import React, { FC } from "react";
import styled from "styled-components";
import ButtonProps from "../interfaces/Button.types";

const StyledButton = styled.button<ButtonProps>`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${(props) => (props.buttonType === "primary" ? "#fff" : "#0fa8b0")};
  height: 30px;
  font-size: 14px;
  outline: none;
  background: ${(props) =>
    props.buttonType === "primary" ? "#0fa8b0" : "transparent"};
  border: none;
  margin-left: auto;
  padding: 8px 10px;
  border-radius: 4px;
`;

const Button: FC<ButtonProps> = ({
  id,
  type,
  onClick,
  name,
  icon,
  buttonType,
}) => (
  <div>
    <StyledButton
      type={type}
      onClick={onClick}
      data-testid={id}
      icon={icon}
      buttonType={buttonType}
    >
      {icon && icon}
      {name}
    </StyledButton>
  </div>
);

export default Button;
