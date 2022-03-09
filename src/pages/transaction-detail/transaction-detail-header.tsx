import styled from "styled-components";
import { CurrencyKeyType } from "../../app-types";
import { FlexContainer } from "../../components";
import Section from "../../components/section";
import SectionText from "../../components/section-text";
import StatusSign from "../../components/status-sign";
import currencyKey from "../../utils/text-keys/currency";
import twoDecimalPlaces from "../../utils/two-decimal-places";

interface TranstionDetailHeaderTypes {
  amount: number;
  amountRefunded: number;
  currencyCode: CurrencyKeyType;
}

const CurrencyTitle = styled.p`
  margin: auto 15px 0 auto;
  font-size: 30px;
`;

const CurrencyLabel = styled.span`
  margin-right: 5px;
`;

const TranstionDetailHeader = ({
  amount,
  amountRefunded,
  currencyCode,
}: TranstionDetailHeaderTypes) => {
  const currency = currencyKey[currencyCode];

  const finalAmountLeft = amount - amountRefunded;

  return (
    <Section flexContainer noBgColor flexWrap='wrap' gap='10px'>
      <FlexContainer>
        <CurrencyTitle>
          <CurrencyLabel>{currency}</CurrencyLabel>
          {twoDecimalPlaces(amount)}
        </CurrencyTitle>

        <SectionText
          header='Refund'
          text={
            <>
              <CurrencyLabel>{currency}</CurrencyLabel>
              {twoDecimalPlaces(amountRefunded)}
            </>
          }
          textColor='#8E8E8E'
          marginRight={15}
        />
        <SectionText
          header='Final'
          text={
            <>
              <CurrencyLabel>{currency}</CurrencyLabel>
              {twoDecimalPlaces(finalAmountLeft)}
            </>
          }
          textColor='#8E8E8E'
          marginRight={15}
        />
      </FlexContainer>
      <div>{amountRefunded > 0 ? <StatusSign withBorder /> : null}</div>
    </Section>
  );
};

export default TranstionDetailHeader;
