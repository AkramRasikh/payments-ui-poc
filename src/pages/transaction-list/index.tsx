import styled from "styled-components";
import icons from "../../assets";
import PaymentStatus from "./transaction-list-payment-status";
import Amount from "./transaction-list-amount";
import { Button, FlexItem, List, ListItem, StatusSign } from "../../components";
import longDate from "../../utils/long-date";
import { NewFormattedPaymentDataType } from "../../app-types";

interface TransactionListTypes {
  paymentList: NewFormattedPaymentDataType[];
  getDetails: (id: string) => void;
}

const FlexItemMobileNoDisplay = styled(FlexItem)`
  @media screen and (max-width: 786px) {
    display: none;
  }
`;

const FlexItemSmallMobileNoDisplay = styled(FlexItem)`
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const FlexItemPaymentStatus = styled(FlexItem)`
  @media screen and (max-width: 480px) {
    text-align: right;
  }
`;

const ProcessorIconImg = styled.img`
  padding-right: 10px;
`;

const TruncateText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TransactionList = ({ paymentList, getDetails }: TransactionListTypes) => (
  <>
    <h1>Transactions</h1>
    <List>
      {paymentList.map((payment) => (
        <ListItem
          key={payment.id}
          flex
          cta={
            <Button onClick={() => getDetails(payment.id)} padding='15px'>
              {"›"}
            </Button>
          }
        >
          <FlexItem textAlign='right' padding='0 10px 0'>
            <Amount
              amount={payment.amount}
              currencyCode={payment.currencyCode}
            />
          </FlexItem>
          <FlexItemPaymentStatus>
            <PaymentStatus text={payment.status} />
          </FlexItemPaymentStatus>

          <FlexItemMobileNoDisplay>
            {payment.amountRefunded ? <StatusSign /> : null}
          </FlexItemMobileNoDisplay>
          <FlexItemMobileNoDisplay>
            {payment?.processor && (
              <ProcessorIconImg
                src={icons[payment?.processor]}
                alt={`${payment.processor}-icon`}
              />
            )}
            {payment.paymentInstrument?.paymentInstrumentData?.binData
              ?.network && (
              <img
                src={
                  icons[
                    payment.paymentInstrument?.paymentInstrumentData?.binData
                      ?.network
                  ]
                }
                alt={`${payment.paymentInstrument?.paymentInstrumentData?.binData?.network}-icon`}
              />
            )}
          </FlexItemMobileNoDisplay>
          <FlexItemMobileNoDisplay flexNumber={2} smallText>
            <span>{payment.orderId}</span>
          </FlexItemMobileNoDisplay>
          <FlexItemSmallMobileNoDisplay smallText>
            <TruncateText>{longDate(payment.date)}</TruncateText>
          </FlexItemSmallMobileNoDisplay>
        </ListItem>
      ))}
    </List>
  </>
);

export default TransactionList;
