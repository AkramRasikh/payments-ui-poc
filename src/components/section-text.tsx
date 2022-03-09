import React from "react";
import styled from "styled-components";

interface SectionTextTypes {
  header: string;
  text: React.ReactNode;
  icon?: string;
  marginBottom?: number;
  marginRight?: number;
  marginTop?: number;
  textColor?: string;
  alt?: string;
}

interface ContainerTypes {
  marginBottom?: number;
  marginRight?: number;
  marginTop?: number;
}

interface TextContainerTypes {
  textColor?: string;
}

const Container = styled.div<ContainerTypes>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: ${({ marginTop }) => marginTop && `${marginTop}px`};
  margin-right: ${({ marginRight }) => marginRight && `${marginRight}px`};
  margin-bottom: ${({ marginBottom }) => marginBottom && `${marginBottom}px`};
`;

const SectionHeader = styled.span`
  color: #8e8e8e;
  margin-bottom: 5px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const IconContainer = styled.div`
  margin-right: 5px;
`;

const TextContainer = styled.span<TextContainerTypes>`
  margin: auto 0;
  color: ${({ textColor }) => textColor && `${textColor}`};
`;

const SectionText = ({
  header,
  text,
  icon,
  marginBottom,
  marginRight,
  marginTop,
  textColor,
  alt,
}: SectionTextTypes) => (
  <Container
    marginRight={marginRight}
    marginTop={marginTop}
    marginBottom={marginBottom}
  >
    <SectionHeader>{header}</SectionHeader>
    {icon ? (
      <FlexContainer>
        <IconContainer>
          <img src={icon} alt={alt} />
        </IconContainer>
        <TextContainer textColor={textColor}>{text}</TextContainer>
      </FlexContainer>
    ) : (
      <TextContainer textColor={textColor}>{text}</TextContainer>
    )}
  </Container>
);

export default SectionText;
