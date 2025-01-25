
import { Collapse } from 'antd';

const { Panel } = Collapse;

const Accordion = () => {
  const questions = [
    {
        key: '1',
        question: 'What types of cars do you sell?',
        answer: 'We sell a variety of cars, including sedans, SUVs, trucks, and electric vehicles from leading manufacturers.',
      },
      {
        key: '2',
        question: 'Do you offer financing options?',
        answer: 'Yes, we provide flexible financing options with competitive rates. Our team will guide you through the process.',
      },
      {
        key: '3',
        question: 'Can I schedule a test drive?',
        answer: 'Absolutely! You can schedule a test drive online or visit our store to experience the car before purchasing.',
      },
      {
        key: '4',
        question: 'What is your warranty policy?',
        answer: 'We offer a standard manufacturer warranty and additional extended warranty packages to suit your needs.',
      },
      {
        key: '5',
        question: 'Do you accept trade-ins?',
        answer: 'Yes, we accept trade-ins. Our experts will assess your car and offer you a fair trade-in value.',
      },
      {
        key: '6',
        question: 'How do I contact your support team?',
        answer: 'You can reach our support team by calling +123 456 789 or emailing us at support@carstore.com.',
      },
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Frequently Asked Questions</h2>
      <Collapse accordion>
        {questions.map((item) => (
          <Panel header={item.question} key={item.key}>
            <p>{item.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Accordion;

