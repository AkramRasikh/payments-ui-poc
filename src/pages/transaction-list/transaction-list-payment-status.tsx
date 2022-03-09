import styled from "styled-components";
import PaymentStatusKey from "../../utils/text-keys/payment-status-key";
import { PaymentStatusTypes } from "../../app-types";

interface PaymentStatusInteface {
  text: PaymentStatusTypes;
}

interface StyledPaymentStatusTypes {
  color: string;
  bgColor: string;
}

const StyledPaymentStatus = styled.span<StyledPaymentStatusTypes>`
  color: ${({ color }) => (color ? color : "#8E8E8E")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#EEEEEE")};
  font-size: 10px;
  padding: 5px;
  border-radius: 5px;
`;

const PaymentStatus = ({ text }: PaymentStatusInteface) => {
  const { color, bgColor } = PaymentStatusKey[text];
  const formattedText = text.toUpperCase();

  return (
    <StyledPaymentStatus color={color} bgColor={bgColor}>
      {formattedText}
    </StyledPaymentStatus>
  );
};

export default PaymentStatus;
