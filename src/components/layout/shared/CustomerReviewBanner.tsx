import { Card, Avatar, Rate, Row, Col, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

import img1 from '../../../assets/images/laila.jpg'
import img2 from '../../../assets/images/na.jpg'
import img3 from '../../../assets/images/keramot.jpg'


const { Title, Text } = Typography;

interface Review {
  name: string;
  image: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  {
    name: 'John Doe',
    image:img1,
    rating: 5,
    comment: 'Great product! Really happy with the performance and quality. Highly recommend it.',
  },
  {
    name: 'Jane Smith',
    image: img2,
    rating: 4,
    comment: 'Good quality, but the delivery was a bit slow. Overall, satisfied with the purchase.',
  },
  {
    name: 'Mark Johnson',
    image: img3,
    rating: 5,
    comment: 'Amazing experience! Will definitely buy again. The product exceeded my expectations.',
  },
  {
    name: 'Emily Davis',
    image: img2,
    rating: 4,
    comment: 'The product was good, but packaging could be better. Still worth it!',
  },
  {
    name: 'Mark Johnson',
    image: img1,
    rating: 5,
    comment: 'Amazing experience! Will definitely buy again. The product exceeded my expectations.',
  },
  {
    name: 'Emily Davis',
    image: img3,
    rating: 4,
    comment: 'The product was good, but packaging could be better. Still worth it!',
  },
];

const CustomerReviewBanner = () => {
  return (
    <div style={{ padding: '20px', margin: '0 auto', maxWidth: '1200px', textAlign: 'center' }}>
      <Title level={2} style={{
                fontSize: '30px',
                fontWeight: 'bold',
                color: '#1677FF',
                textShadow: '2px 2px 20px rgba(0, 25, 0, 0.8)', // Orange shadow effect
                marginTop: '30px',
                marginBottom:'30px'
            }}>
        What Our Customers Are Saying
      </Title>
      <Row gutter={[16, 24]} justify="center">
        {reviews.map((review, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                textAlign: 'center',
                height: '100%',
              }}
            >
              <Avatar
                size={80}
                src={review.image}
                alt={review.name}
                style={{ marginBottom: '15px' }}
              />
              <Title level={4} style={{ marginBottom: '10px', fontSize: '18px' }}>
                {review.name}
              </Title>
              <Rate
                disabled
                value={review.rating}
                character={<StarFilled style={{ color: '#fadb14' }} />}
              />
              <div style={{ marginTop: '10px' }}>
                <Text style={{ fontSize: '14px' }}>{review.comment}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CustomerReviewBanner;
