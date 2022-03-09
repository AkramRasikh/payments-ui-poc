import styled from "styled-components";

interface StatusSignTypes {
  withBorder?: boolean;
}

const StatusSignContainer = styled.div<StatusSignTypes>`
  display: flex;
  border: ${({ withBorder }) => withBorder && "2px solid"};
  border-radius: ${({ withBorder }) => withBorder && "5px"};
  margin: ${({ withBorder }) => withBorder && "auto 0"};
  padding: ${({ withBorder }) => withBorder && "10px"};
`;

const ArrowContainer = styled.div<StatusSignTypes>`
  margin-right: 5px;
  margin: ${({ withBorder }) => withBorder && "auto 10px"};
`;

const StatusSign = ({ withBorder }: StatusSignTypes) => (
  <StatusSignContainer withBorder={withBorder}>
    <ArrowContainer withBorder={withBorder}>↰</ArrowContainer>
    <span>Refunded</span>
  </StatusSignContainer>
);

export default StatusSign;
