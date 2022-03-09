import { FlexContainer } from "../../components";
import Section from "../../components/section";
import SectionText from "../../components/section-text";

interface CardPaymentSectionTypes {
  cardholderName?: string;
  last4Digits?: string;
  expirationMonth?: string;
  expirationYear?: string;
  icon: string;
}

const CardPaymentSection = ({
  cardholderName,
  last4Digits,
  expirationMonth,
  expirationYear,
  icon,
}: CardPaymentSectionTypes) => {
  const cardNumberDigits = `**** **** **** ${last4Digits}`;

  const formattedEndDate = `${expirationMonth}/${expirationYear}`;
  return (
    <Section header='Payment Method' icon={icon} dataTestId='card-payment-id'>
      <SectionText
        header='Cardholder Name'
        text={cardholderName}
        marginBottom={25}
      />
      <FlexContainer>
        <SectionText
          header='Card Number'
          text={cardNumberDigits}
          marginRight={15}
        />
        <SectionText header='Expiration' text={formattedEndDate} />
      </FlexContainer>
    </Section>
  );
};

export default CardPaymentSection;
