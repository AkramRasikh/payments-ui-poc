import styled from "styled-components";

interface SectionTypes {
  header?: string;
  icon?: string;
  flexContainer?: boolean;
  verticalPadding?: number;
  noBgColor?: boolean;
  dataTestId?: string;
  flexWrap?: string;
  className?: string;
  gap?: string;
  children: JSX.Element | JSX.Element[];
}

interface ContainerTypes {
  flexContainer?: boolean;
  verticalPadding?: number;
  noBgColor?: boolean;
  flexWrap?: string;
  gap?: string;
}

const StyledContainer = styled.div<ContainerTypes>`
  background-color: ${({ noBgColor }) => !noBgColor && "#ffffff"};
  border-radius: 5px;
  padding: ${({ verticalPadding }) =>
    verticalPadding ? `${verticalPadding}px 10px` : "10px"};
  flex: 1 0 calc(40% - 10px);
  display: ${({ flexContainer }) => (flexContainer ? "flex" : "block")};
  flex-wrap: ${({ flexWrap }) => flexWrap && flexWrap};
  gap: ${({ gap }) => gap && gap};
  margin: 10px;
`;

const HeaderIconContainer = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding-bottom: 15px;
  display: flex;
  img {
    padding-right: 10px;
  }
  p {
    margin: auto 0;
    font-weight: bold;
  }
`;

const Section = ({
  header,
  icon,
  flexContainer,
  verticalPadding,
  noBgColor,
  flexWrap,
  gap,
  className,
  children,
  dataTestId,
}: SectionTypes) => (
  <StyledContainer
    flexContainer={flexContainer}
    verticalPadding={verticalPadding}
    flexWrap={flexWrap}
    noBgColor={noBgColor}
    data-testid={dataTestId}
    className={className}
    gap={gap}
  >
    {header && (
      <HeaderIconContainer>
        <img src={icon} alt='icon' /> <p>{header}</p>
      </HeaderIconContainer>
    )}
    {children}
  </StyledContainer>
);

export default Section;
