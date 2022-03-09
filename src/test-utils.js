import currency from "./utils/text-keys/currency";
import exemptedCardPaymentInstruments from "./utils/text-keys/exempted-card-payment-instruments";
import secureResponse from "./utils/text-keys/secure-response";
import twoDecimalPlaces from "./utils/two-decimal-places";

export const checkRefunds = (paymentData, screen) => {
  const refunds = screen.getAllByText(
    twoDecimalPlaces(paymentData.amountRefunded)
  );
  if (paymentData.amountRefunded) {
    screen.getByText("Refunded");
    expect(refunds.length).toBe(2);
  } else {
    expect(refunds.length).toBe(1);
  }
};

export const checkCurrency = (paymentData, screen) => {
  const currencySymbols = screen.getAllByText(
    currency[paymentData.currencyCode]
  );
  expect(currencySymbols.length).toBe(3);
  screen.getByText(paymentData.currencyCode);
};
export const checkProcessor = (paymentData, screen) => {
  const processorIcon = paymentData.processor;
  const networkIcon =
    paymentData.paymentInstrument?.paymentInstrumentData?.binData?.network;
  screen.getByText(processorIcon);
  screen.getByAltText(`${processorIcon}-icon`);
  if (networkIcon) {
    screen.getByAltText(`${networkIcon}-icon`);
  } else {
    expect(
      screen.queryByAltText(`${networkIcon}-icon`)
    ).not.toBeInTheDocument();
  }
};

export const checkCardPayment = (paymentData, screen) => {
  const paymentByCard = paymentData.paymentInstrument?.paymentInstrumentType;
  if (paymentByCard === "PAYMENT_CARD") {
    screen.getByText(
      paymentData.paymentInstrument.paymentInstrumentData?.cardholderName
    );
    screen.getByText(
      `**** **** **** ${paymentData.paymentInstrument.paymentInstrumentData?.last4Digits}`
    );
    screen.getByText(
      `${paymentData.paymentInstrument.paymentInstrumentData.expirationMonth}/${paymentData.paymentInstrument.paymentInstrumentData.expirationYear}`
    );
  } else {
    expect(screen.queryByTestId("card-payment-id")).not.toBeInTheDocument();
  }
};
export const checkTransactionSection = (paymentData, screen) => {
  const transactionsData = paymentData.transactions;
  const hasValidTransactionData = transactionsData?.filter((transactionData) =>
    exemptedCardPaymentInstruments.includes(transactionData.status)
  );
  if (
    hasValidTransactionData &&
    hasValidTransactionData?.processorTransactionId
  ) {
    screen.getByText(hasValidTransactionData.processorTransactionId);
  }
  if (hasValidTransactionData && hasValidTransactionData?.processorMerchantId) {
    screen.getByText(hasValidTransactionData.processorMerchantId);
  }
  if (transactionsData?.length < 0) {
    expect(screen.queryByTestId("processor-section")).not.toBeInTheDocument();
  }
};

export const checkSecureResponse = (paymentData, screen, within) => {
  const secureAuthentication =
    paymentData.paymentInstrument?.threeDSecureAuthentication?.responseCode;

  const secureResponseText = secureResponse[secureAuthentication]?.text;
  if (secureResponseText) {
    screen.getByText(secureResponseText);
    const secureResponseSection = within(
      screen.getByTestId("secure-response-id")
    );
    secureResponseSection.getByAltText("icon");
  } else {
    expect(screen.queryByTestId("secure-response-id")).not.toBeInTheDocument();
  }
};

export const checkRefundedSection = (transactionListItem, refund) => {
  if (refund) {
    transactionListItem.getByText("Refunded");
  } else {
    expect(transactionListItem.queryByText("Refunded")).not.toBeInTheDocument();
  }
};

export const checkNetworkIcons = (transactionListItem, networkIcon) => {
  if (networkIcon) {
    transactionListItem.getByAltText(`${networkIcon}-icon`);
  } else {
    expect(
      transactionListItem.queryByAltText(`${networkIcon}-icon`)
    ).not.toBeInTheDocument();
  }
};
