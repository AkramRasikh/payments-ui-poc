import styled from "styled-components";
import icons from "../../assets";
import longDate from "../../utils/long-date";
import PaymentStatusKey from "../../utils/text-keys/payment-status-key";
import Section from "../../components/section";
import SectionText from "../../components/section-text";
import exemptedCardPaymentInstruments from "../../utils/text-keys/exempted-card-payment-instruments";
import {
  PaymentInstrumentText,
  PaymentInstrumentTypeKeys,
  PaymentStatusTypes,
  Processor,
} from "../../app-types";
import { FlexContainer } from "../../components";

interface TransactionDetailsSummaryTypes {
  currency: string;
  processor: Processor;
  paymentNetwork?: Processor;
  paymentInstrument: PaymentInstrumentTypeKeys;
  orderId: string;
  submittedDate: Date;
  status: PaymentStatusTypes;
}

interface StyledPaymentStatusTypes {
  color: string;
  bgColor: string;
}

const PaymentStatusContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
`;

const StyledPaymentStatus = styled.span<StyledPaymentStatusTypes>`
  color: ${({ color }) => (color ? color : "#8E8E8E")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#EEEEEE")};
  font-size: 150%;
  padding: 5px;
  border-radius: 5px;
  margin: auto;
  margin-right: 0;
`;

const TransactionDetailsSummary = ({
  currency,
  processor,
  paymentNetwork,
  paymentInstrument,
  orderId,
  submittedDate,
  status,
}: TransactionDetailsSummaryTypes) => {
  const processorIcon = icons[processor];
  const paymentMethodText = PaymentInstrumentText[paymentInstrument];
  const { color, bgColor } = PaymentStatusKey[status];

  const paymentMethodFull = paymentNetwork + " / " + paymentMethodText;
  const longDateFormat = longDate(submittedDate);

  const showCardPaymentSection =
    !exemptedCardPaymentInstruments.includes(paymentInstrument);

  return (
    <Section flexContainer verticalPadding={30}>
      <FlexContainer gap='10px' flexWrap='wrap'>
        <SectionText header='Currency' text={currency} marginRight={10} />
        <SectionText
          header='Processor'
          text={processor}
          icon={processorIcon}
          alt={`${processor}-icon`}
          marginRight={10}
        />

        {showCardPaymentSection && (
          <SectionText
            header='Payment Method'
            text={paymentMethodFull}
            icon={icons[paymentNetwork!]}
            alt={`${paymentNetwork}-icon`}
            marginRight={10}
          />
        )}
        <SectionText header='Your Reference' text={orderId} marginRight={10} />
        <SectionText header='Submitted' text={longDateFormat} />
      </FlexContainer>
      <PaymentStatusContainer>
        <StyledPaymentStatus color={color} bgColor={bgColor}>
          {status}
        </StyledPaymentStatus>
      </PaymentStatusContainer>
    </Section>
  );
};

export default TransactionDetailsSummary;
