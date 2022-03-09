import React from "react";
import styled from "styled-components";

interface FlexItemTypes {
  flexNumber?: number;
  textAlign?: string;
  padding?: string;
  className?: string;
  smallText?: boolean;
  children: React.ReactNode;
}

const StyledFlexItem = styled.div<FlexItemTypes>`
  flex: ${({ flexNumber }) => (flexNumber ? flexNumber : 1)};
  text-align: ${({ textAlign }) => textAlign && textAlign};
  padding: ${({ padding }) => padding && padding};
  font-size: ${({ smallText }) => (smallText ? "12px" : "")};
  margin: auto;
`;

const FlexItem = ({
  flexNumber,
  textAlign,
  padding,
  smallText,
  children,
  className,
}: FlexItemTypes) => (
  <StyledFlexItem
    flexNumber={flexNumber}
    textAlign={textAlign}
    padding={padding}
    smallText={smallText}
    className={className}
  >
    {children}
  </StyledFlexItem>
);

export default FlexItem;
