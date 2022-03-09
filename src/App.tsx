import React from "react";
import { getAllPaymentDetails, getAuthToken, getData } from "./api-calls";
import { NewFormattedPaymentDataType, PaymentDataResponse } from "./app-types";

import TransactionDetail from "./pages/transaction-detail";
import TransactionList from "./pages/transaction-list";

const App = () => {
  const [paymentList, setPaymentList] = React.useState<
    NewFormattedPaymentDataType[]
  >([]);
  const [detailedPayment, setDetailedPayment] =
    React.useState<NewFormattedPaymentDataType | null>();
  const [errorMsg, setErrorMsg] = React.useState<string>();

  const getDetails = (paymentId: string) => {
    const [paymentInfo] = paymentList.filter(({ id }) => id === paymentId);
    setDetailedPayment(paymentInfo);
  };

  React.useEffect(() => {
    const getPaymentData = async () => {
      try {
        const token = await getAuthToken();
        const data = await getData(token);

        const allIndividalPaymentDetails = await getAllPaymentDetails(
          data,
          token
        );

        const paymentDataCombined = data.map(
          (
            {
              id,
              orderId,
              amount,
              amountRefunded,
              date,
              status,
              processor,
              paymentInstrument,
              currencyCode,
              processorMerchantId,
            }: PaymentDataResponse,
            index: number
          ) => {
            const transactions =
              allIndividalPaymentDetails[index]?.transactions;
            return {
              id,
              orderId,
              amount,
              amountRefunded,
              date,
              status,
              processor,
              paymentInstrument,
              currencyCode,
              processorMerchantId,
              transactions,
            };
          }
        );
        setPaymentList(paymentDataCombined);
      } catch (error) {
        setErrorMsg(error);
      }
    };
    getPaymentData();
  }, []);

  const backToTransactions = () => {
    setDetailedPayment(null);
  };

  return (
    <div>
      {errorMsg && <p>{errorMsg}</p>}
      {paymentList?.length > 0 && !detailedPayment ? (
        <TransactionList paymentList={paymentList} getDetails={getDetails} />
      ) : null}
      {detailedPayment && (
        <TransactionDetail
          {...detailedPayment}
          backToTransactions={backToTransactions}
        />
      )}
    </div>
  );
};

export default App;
