import styled from "styled-components";
import { Button } from "../../components";

interface TransactionDetailsBackBtnTypes {
  onClick: () => void;
}

const BackToTransactionsContainer = styled.div`
  padding: 10px;
`;

const BackToTransactionsArrow = styled.span`
  margin-right: 10px;
`;

const TransactionDetailsBackBtn = ({
  onClick,
}: TransactionDetailsBackBtnTypes) => (
  <BackToTransactionsContainer>
    <Button onClick={onClick} color='#6e7bf3'>
      <BackToTransactionsArrow>←</BackToTransactionsArrow>Transactions
    </Button>
  </BackToTransactionsContainer>
);

export default TransactionDetailsBackBtn;
