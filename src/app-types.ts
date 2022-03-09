export interface PaymentDataResponse {
  id: string;
  date: Date;
  status: string;
  orderId: string;
  processor: Processor;
  processorMerchantId: ProcessorMerchantID;
  currencyCode: CurrencyCode;
  amount: number;
  amountAuthorized: number;
  amountCaptured: number;
  amountRefunded: number;
  requiredAction: null;
  statementDescriptor: null;
  paymentInstrument: PaymentInstrument;
  vaultedPaymentInstrument: null;
  customer: Customer | null;
  lastPaymentError: null;
  metadata: null;
}

export interface NewFormattedPaymentDataType {
  id: IndividualTypesTing["id"];
  orderId: IndividualTypesTing["orderId"];
  amount: IndividualTypesTing["amount"];
  amountRefunded: IndividualTypesTing["amountRefunded"];
  date: IndividualTypesTing["date"];
  status: IndividualTypesTing["status"];
  processor: IndividualTypesTing["processor"];
  paymentInstrument: IndividualTypesTing["paymentInstrument"];
  currencyCode: CurrencyKeyType;
  processorMerchantId: IndividualTypesTing["processorMerchantId"];
  transactions?: IndividualTypesTing["transactions"];
}

export type CurrencyKeyType = "EUR" | "GBP";

export interface IndividualTypesTing {
  error?: Error;
  id: string;
  date: Date;
  status: PaymentStatusTypes;
  orderId: string;
  processor: Processor;
  processorMerchantId: ProcessorMerchantID;
  currencyCode: CurrencyCode;
  amount: number;
  amountAuthorized: number;
  amountCaptured: number;
  amountRefunded: number;
  requiredAction: null;
  statementDescriptor: null;
  paymentInstrument: PaymentInstrument;
  vaultedPaymentInstrument: null;
  customer: null;
  lastPaymentError: null;
  metadata: null;
  isCapturable?: boolean;
  workflowConfig?: null;
  transactions?: Transaction[];
  clientSessionData?: null;
}

export type PaymentStatusTypes =
  | "FAILED"
  | "DECLINED"
  | "CANCELLED"
  | "SETTLING"
  | "AUTHORIZED"
  | "SETTLED";

export enum CurrencyCode {
  Eur = "EUR",
  Gbp = "GBP",
  Usd = "USD",
}

export interface Error {
  errorId: string;
  description: string;
  diagnosticsId: string;
  validationErrors: any[];
}

export interface PaymentInstrument {
  token: string;
  analyticsId: string;
  tokenType: TokenType;
  paymentInstrumentType: PaymentInstrumentType;
  paymentInstrumentData: PaymentInstrumentData;
  threeDSecureAuthentication: ThreeDSecureAuthentication | null;
}

export interface PaymentInstrumentData {
  paypalOrderId?: string;
  externalPayerInfo?: null;
  paypalStatus?: null;
  last4Digits?: string;
  first6Digits?: null;
  expirationMonth?: string;
  expirationYear?: string;
  cardholderName?: string;
  network?: PaymentInstrumentDataNetwork;
  isNetworkTokenized?: boolean;
  binData?: BinData;
}

export interface BinData {
  network: Processor;
  issuerCountryCode: null;
  issuerName: null;
  issuerCurrencyCode: null;
  regionalRestriction: AccountFundingType;
  accountNumberType: AccountFundingType;
  accountFundingType: AccountFundingType;
  prepaidReloadableIndicator: PrepaidReloadableIndicator;
  productUsageType: AccountFundingType;
  productCode: ProductCodeEnum;
  productName: ProductCodeEnum;
}

export enum AccountFundingType {
  Unknown = "UNKNOWN",
}

export enum ProductCodeEnum {
  Amex = "AMEX",
  Jcb = "JCB",
  Maestro = "MAESTRO",
  Mastercard = "MASTERCARD",
  Visa = "VISA",
}

export enum PrepaidReloadableIndicator {
  NotApplicable = "NOT_APPLICABLE",
}

export enum PaymentInstrumentDataNetwork {
  AmericanExpress = "American Express",
  Mastercard = "Mastercard",
  Other = "other",
  Visa = "Visa",
}

export enum PaymentInstrumentType {
  PaymentCard = "PAYMENT_CARD",
  PaypalOrder = "PAYPAL_ORDER",
}

export enum PaymentInstrumentText {
  PAYMENT_CARD = "CARD",
  PAYPAL_ORDER = "PAYPAL",
}

export type PaymentInstrumentTypeKeys = "PAYMENT_CARD" | "PAYPAL_ORDER";

export type SecureKeyInterface = "PERFORMED" | "NOT_PERFORMED";

export interface ThreeDSecureAuthentication {
  responseCode: SecureKeyInterface;
  reasonCode: null;
  reasonText: null;
  protocolVersion: null;
  challengeIssued: null;
}

export enum TokenType {
  SingleUse = "SINGLE_USE",
}

export type Processor =
  | "THREEDS"
  | "ADYEN"
  | "AMEX"
  | "STRIPE"
  | "PAYPAL"
  | "BRAINTREE"
  | "MAESTRO"
  | "MASTERCARD"
  | "PAYMENT_CARD"
  | "JCB"
  | "VISA";

export enum ProcessorMerchantID {
  Acct1GORCSGZqNWFwi8C = "acct_1GORcsGZqNWFwi8c",
  Primer = "primer",
  PrimerJbTestECOM = "PrimerJbTestECOM",
  Sb32Arh1340866BusinessExampleCOM = "sb-32arh1340866@business.example.com",
  Test1 = "test1",
}

export interface Transaction {
  id: string;
  processorTransactionId?: string;
  processor: Processor;
  processorMerchantId: ProcessorMerchantID;
  type: Type;
  status: string;
  paymentError: PaymentError | null;
}

export interface PaymentError {
  date: Date;
  type: string;
  declineCode: null;
  declineType: null;
  processorMessage: string;
}

export enum Type {
  Refund = "REFUND",
  Sale = "SALE",
}

export interface Customer {
  email: string;
  phoneNumber: null;
  billingAddress: null;
  shippingAddress: null;
  id: null;
}
