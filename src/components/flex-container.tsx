import React from "react";
import styled from "styled-components";

interface StyledFlexContainerProps {
  flexWrap?: string;
  gap?: string;
}

const StyledFlexContainer = styled.div<StyledFlexContainerProps>`
  display: flex;
  flex-wrap: ${({ flexWrap }) => flexWrap && flexWrap};
  gap: ${({ gap }) => gap && gap};
`;

interface FlexContainerProps {
  flexWrap?: string;
  gap?: string;
  className?: string;
  children: React.ReactNode;
}

const FlexContainer = ({
  flexWrap,
  gap,
  className,
  children,
}: FlexContainerProps) => (
  <StyledFlexContainer flexWrap={flexWrap} gap={gap} className={className}>
    {children}
  </StyledFlexContainer>
);

export default FlexContainer;
