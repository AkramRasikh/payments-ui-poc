import icons from "../../assets";
import styled from "styled-components";
import Section from "../../components/section";
import SectionText from "../../components/section-text";
import secureResponse from "../../utils/text-keys/secure-response";
import { ThreeDSecureAuthentication } from "../../app-types";

interface SecureResponseSectionTypes {
  isThreeDSecure: ThreeDSecureAuthentication;
}

interface StyledThreeDStatusTypes {
  color: string;
  bgColor: string;
}

const StyledThreeDStatus = styled.span<StyledThreeDStatusTypes>`
  color: ${({ color }) => color && color};
  background-color: ${({ bgColor }) => bgColor && bgColor};
  font-size: 10px;
  padding: 5px;
  border-radius: 5px;
`;

const SecureResponseSection = ({
  isThreeDSecure,
}: SecureResponseSectionTypes) => {
  const secureIcon = icons.THREEDS;
  const { text, color, bgColor } = secureResponse[isThreeDSecure?.responseCode];
  const subContentComponent = (
    <StyledThreeDStatus color={color} bgColor={bgColor}>
      {text}
    </StyledThreeDStatus>
  );

  return (
    <Section
      header='3DSecure'
      icon={secureIcon}
      dataTestId='secure-response-id'
    >
      <SectionText header='Response' text={subContentComponent} />
    </Section>
  );
};

export default SecureResponseSection;
