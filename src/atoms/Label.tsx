import React, { FC } from "react";
import styled from "styled-components";
import LabelProps from "../interfaces/Label.types";

const StyledLabel = styled.label<LabelProps>`
  display: block;
`;

const Label: FC<LabelProps> = ({ label }) => (
  <div>
    <StyledLabel htmlFor={label}>{label}</StyledLabel>
  </div>
);

export default Label;
