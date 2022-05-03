import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, Fragment } from "react";
import styled from "styled-components";

type IconProps = {
  icon?: any;
};

const StyledLabel = styled.div<IconProps>`
  font-size: 20px;
  font-weight: 500;
  display: block;
  color: #5e5858;
`;

const Icon: FC<IconProps> = ({ icon }) => {
  return (
    <Fragment>
      <StyledLabel>
        <FontAwesomeIcon icon={icon} />
      </StyledLabel>
    </Fragment>
  );
};

export default Icon;
