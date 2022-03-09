import styled from "styled-components";
import icons from "../../assets";
import CardPaymentSection from "./transaction-detail-card-payment-section";
import SecureResponseSection from "./transaction-detail-secure-response-section";
import ProcessorSection from "./transaction-detail-processor-section";
import TranstionDetailHeader from "./transaction-detail-header";
import TransactionDetailSummary from "./transaction-detail-summary";
import badTransactionStatuses from "../../utils/text-keys/bad-transaction-statuses";
import {
  NewFormattedPaymentDataType,
  PaymentInstrumentType,
} from "../../app-types";
import TransactionDetailsBackBtn from "./transaction-detail-back-btn";

const SectionContainers = styled.div`
  @media screen and (min-width: 786px) {
    display: flex;
  }
`;

interface TransactionDetailProps extends NewFormattedPaymentDataType {
  backToTransactions: () => void;
}

const TransactionDetail = ({
  transactions,
  paymentInstrument,
  backToTransactions,
  amount,
  amountRefunded,
  currencyCode,
  processor,
  orderId,
  date,
  status,
}: TransactionDetailProps) => {
  const {
    cardholderName,
    expirationMonth,
    expirationYear,
    last4Digits,
    binData,
  } = paymentInstrument?.paymentInstrumentData;

  const processorIcon = icons[processor];
  const paymentMethodIcon = icons[processor];

  const paymentInstrumentType = paymentInstrument?.paymentInstrumentType;
  const isThreeDSecure = paymentInstrument?.threeDSecureAuthentication;

  const paidByCard =
    paymentInstrumentType === PaymentInstrumentType.PaymentCard;

  const transaction = transactions?.filter(
    (transaction) => !badTransactionStatuses.includes(transaction.status)
  );

  return (
    <>
      <TransactionDetailsBackBtn onClick={backToTransactions} />
      <TranstionDetailHeader
        amount={amount}
        amountRefunded={amountRefunded}
        currencyCode={currencyCode}
      />
      <TransactionDetailSummary
        currency={currencyCode}
        processor={processor}
        paymentNetwork={binData?.network}
        paymentInstrument={paymentInstrumentType}
        orderId={orderId}
        submittedDate={date}
        status={status}
      />
      {!!transaction?.length && (
        <ProcessorSection
          icon={processorIcon}
          processorMerchantId={transaction[0].processorMerchantId}
          processorTransactionId={transaction[0].processorTransactionId}
        />
      )}
      <SectionContainers>
        {paidByCard && (
          <CardPaymentSection
            icon={paymentMethodIcon}
            cardholderName={cardholderName}
            last4Digits={last4Digits}
            expirationMonth={expirationMonth}
            expirationYear={expirationYear}
          />
        )}
        {isThreeDSecure && (
          <SecureResponseSection isThreeDSecure={isThreeDSecure} />
        )}
      </SectionContainers>
    </>
  );
};

export default TransactionDetail;
