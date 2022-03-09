import { fireEvent, render, screen, within } from "@testing-library/react";
import * as apiCalls from "./api-calls";
import App from "./App";
import { paymentDetails, paymentsData } from "./mock-data";
import twoDecimalPlaces from "./utils/two-decimal-places";
import longDate from "./utils/long-date";
import {
  checkRefunds,
  checkCurrency,
  checkProcessor,
  checkCardPayment,
  checkTransactionSection,
  checkSecureResponse,
  checkRefundedSection,
  checkNetworkIcons,
} from "./test-utils";

jest.mock("./api-calls");

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders error message when token is not retrieved", async () => {
  const authMock = apiCalls.getAuthToken as jest.Mock;
  authMock.mockImplementation(() => Promise.reject("No auth token :("));
  render(<App />);
  const primerElement = await screen.findByText("No auth token :(");
  expect(primerElement).toBeInTheDocument();
});

test("renders error message when token retrieved but error in data retrieval", async () => {
  const authMock = apiCalls.getAuthToken as jest.Mock;
  const getDataMock = apiCalls.getData as jest.Mock;
  authMock.mockImplementation(() => Promise.resolve("1234"));
  getDataMock.mockImplementation(() => Promise.reject("Can't get data :("));
  render(<App />);
  const primerElement = await screen.findByText("Can't get data :(");
  expect(primerElement).toBeInTheDocument();
});

test("renders error message when token & payment retrieved but error in payment detail retrieval", async () => {
  const authMock = apiCalls.getAuthToken as jest.Mock;
  const getDataMock = apiCalls.getData as jest.Mock;
  const getAllPaymentDetailsMock = apiCalls.getData as jest.Mock;
  authMock.mockImplementation(() => Promise.resolve("1234"));
  getDataMock.mockImplementation(() => Promise.resolve(paymentsData));
  getAllPaymentDetailsMock.mockImplementation(() =>
    Promise.reject("Couldn't return payment details :(")
  );
  render(<App />);
  const primerElement = await screen.findByText(
    "Couldn't return payment details :("
  );
  expect(primerElement).toBeInTheDocument();
});

test("renders transaction list", async () => {
  const authMock = apiCalls.getAuthToken as jest.Mock;
  const getDataMock = apiCalls.getData as jest.Mock;
  const getAllPaymentDetailsMock = apiCalls.getAllPaymentDetails as jest.Mock;
  authMock.mockImplementation(() => Promise.resolve("1234"));
  getDataMock.mockImplementation(() => Promise.resolve(paymentsData));
  getAllPaymentDetailsMock.mockImplementation(() =>
    Promise.resolve(paymentDetails)
  );
  render(<App />);
  const primerElement = await screen.findByText("Transactions");

  const transactionList = screen.getAllByRole("listitem");
  transactionList.forEach((_, index) => {
    const transactionListItem = within(transactionList[index]);
    const amount = twoDecimalPlaces(paymentsData[index].amount);
    const currency = paymentsData[index].currencyCode;
    const status = paymentsData[index].status;
    const refund = paymentsData[index].amountRefunded;
    const orderId = paymentsData[index].orderId;
    const timeSubmitted = paymentsData[index].date;
    const processorIcon = paymentsData[index].processor;
    const networkIcon =
      paymentsData[index].paymentInstrument?.paymentInstrumentData?.binData
        ?.network;
    transactionListItem.getByText(amount);
    transactionListItem.getByText(currency);
    transactionListItem.getByText(status);
    checkRefundedSection(transactionListItem, refund);
    transactionListItem.getByText(orderId);
    transactionListItem.getByText(longDate(timeSubmitted));
    transactionListItem.getByAltText(`${processorIcon}-icon`);
    checkNetworkIcons(transactionListItem, networkIcon);
  });
  expect(primerElement).toBeInTheDocument();
});

test("renders transaction details", async () => {
  const authMock = apiCalls.getAuthToken as jest.Mock;
  const getDataMock = apiCalls.getData as jest.Mock;
  const getAllPaymentDetailsMock = apiCalls.getAllPaymentDetails as jest.Mock;
  authMock.mockImplementation(() => Promise.resolve("1234"));
  getDataMock.mockImplementation(() => Promise.resolve(paymentsData));
  getAllPaymentDetailsMock.mockImplementation(() =>
    Promise.resolve(paymentDetails)
  );
  render(<App />);
  await screen.findByText("Transactions");
  const transactionList = screen.getAllByRole("listitem");
  transactionList.forEach((_, index) => {
    const goToTransactionDetailsBtn = screen.getAllByRole("button")[index];
    fireEvent.click(goToTransactionDetailsBtn);
    const headerAmounts = screen.getAllByText(
      twoDecimalPlaces(paymentsData[index].amount)
    );
    expect(headerAmounts.length).toBe(2);
    checkRefunds(paymentsData[index], screen);
    checkCurrency(paymentsData[index], screen);
    checkProcessor(paymentsData[index], screen);
    const orderId = paymentsData[index].orderId;
    screen.getByText(orderId);
    const timeSubmitted = paymentsData[index].date;
    screen.getByText(longDate(timeSubmitted));
    checkCardPayment(paymentsData[index], screen);
    checkTransactionSection(paymentsData[index], screen);
    checkSecureResponse(paymentsData[index], screen, within);
    // go back to transaction list page
    const returnToTransactionListBtn = screen.getByRole("button");
    fireEvent.click(returnToTransactionListBtn);
  });
});
