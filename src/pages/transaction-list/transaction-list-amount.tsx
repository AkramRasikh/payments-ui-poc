import styled from "styled-components";
import twoDecimalPlaces from "../../utils/two-decimal-places";

interface TransactionListAmountTypes {
  amount: number;
  currencyCode: string;
}

const StyledAmount = styled.span`
  font-weight: 700;
`;

const StyledCurrency = styled.span`
  padding-left: 10px;
`;

const TransactionListAmount = ({
  amount,
  currencyCode,
}: TransactionListAmountTypes) => {
  const amountWithdecimals = twoDecimalPlaces(amount);
  return (
    <StyledAmount>
      {amountWithdecimals} <StyledCurrency> {currencyCode}</StyledCurrency>
    </StyledAmount>
  );
};

export default TransactionListAmount;
