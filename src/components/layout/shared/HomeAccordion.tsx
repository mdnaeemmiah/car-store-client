
import { Collapse } from 'antd';

const { Panel } = Collapse;

const HomeAccordion = () => {
  const questions = [
    {
      key: '1',
      question: 'What types of cars do you sell?',
      answer: 'We sell a variety of cars, including sedans, SUVs, trucks, and electric vehicles from leading manufacturers.',
      image: 'src/assets/images/img5.avif', // Add image URL for each question
    },
    {
      key: '2',
      question: 'Do you offer financing options?',
      answer: 'Yes, we provide flexible financing options with competitive rates. Our team will guide you through the process.',
      image: 'src/assets/images/img4.avif',
    },
    {
      key: '3',
      question: 'Can I schedule a test drive?',
      answer: 'Absolutely! You can schedule a test drive online or visit our store to experience the car before purchasing.',
      image: 'src/assets/images/img5.avif',
    },
    {
      key: '4',
      question: 'What is your warranty policy?',
      answer: 'We offer a standard manufacturer warranty and additional extended warranty packages to suit your needs.',
      image: 'src/assets/images/img11.avif',
    },
    {
      key: '5',
      question: 'Do you accept trade-ins?',
      answer: 'Yes, we accept trade-ins. Our experts will assess your car and offer you a fair trade-in value.',
      image: 'src/assets/images/img4.avif',
    },
    {
      key: '6',
      question: 'How do I contact your support team?',
      answer: 'You can reach our support team by calling +123 456 789 or emailing us at support@carstore.com.',
      image: 'src/assets/images/img5.avif',
    },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px',textAlign:'center' }}>
      <h2  style={{
                fontSize: '30px',
                fontWeight: 'bold',
                color: '#1677FF',
                marginBottom:'20px',
                textShadow: '2px 2px 20px rgba(0, 25, 0, 0.8)', // Orange shadow effect
            }}>Frequently Asked Questions</h2>
      <Collapse accordion>
        {questions.map((item) => (
          <Panel header={item.question} key={item.key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img
                src={item.image}
                alt="FAQ"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%', // Rounded image
                  margin: '0 auto', // mx-auto equivalent
                  objectFit: 'cover',
                }}
              />
              <p style={{ margin: 0 }}>{item.answer}</p>
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default HomeAccordion;