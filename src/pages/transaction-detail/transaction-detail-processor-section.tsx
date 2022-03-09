import Section from "../../components/section";
import SectionText from "../../components/section-text";

interface ProcessorSectionTypes {
  icon: string;
  processorMerchantId?: string;
  processorTransactionId?: string;
}

const ProcessorSection = ({
  icon,
  processorMerchantId,
  processorTransactionId,
}: ProcessorSectionTypes) => (
  <Section header='Processor' icon={icon} dataTestId='processor-section'>
    <>
      {processorMerchantId && (
        <SectionText
          header='Processor'
          text={processorMerchantId}
          marginBottom={25}
        />
      )}
      {processorTransactionId && (
        <SectionText
          header='Transaction ID'
          text={processorTransactionId}
          textColor='#6e7bf3'
        />
      )}
    </>
  </Section>
);

export default ProcessorSection;
