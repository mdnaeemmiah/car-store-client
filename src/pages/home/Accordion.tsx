import { Collapse, Row, Col } from 'antd';
import img1 from '../../assets/images/img13.jpeg'

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
    {
      key: '7',
      question: 'How do I contact your support team?',
      answer: 'You can reach our support team by calling +123 456 789 or emailing us at support@carstore.com.',
    },
  ];

  return (
    <Row
      gutter={16}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '',
        padding: '20px',
        margin: '0 auto', // mx-auto equivalent
      }}
    >
      {/* Accordion Section */}
      <Col xs={24} md={12} style={{ padding: '20px', margin: '0 auto' }}> {/* mx-auto equivalent */}
        <Collapse accordion>
          {questions.map((item) => (
            <Panel header={item.question} key={item.key}>
              <p>{item.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </Col>

      {/* Image Section */}
      <Col xs={24} md={12} style={{ textAlign: 'center', margin: '0 auto' }}> {/* mx-auto equivalent */}
        <img
          src={img1} // Replace with your image URL
          alt="Car Store"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px', margin: '0 auto' }} // mx-auto applied to the image
        />
      </Col>
    </Row>
  );
};

export default Accordion;
