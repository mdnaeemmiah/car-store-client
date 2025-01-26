import { Card, Avatar, Rate, Row, Col, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

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
    image: 'src/assets/images/img13.jpeg',
    rating: 5,
    comment: 'Great product! Really happy with the performance and quality. Highly recommend it.',
  },
  {
    name: 'Jane Smith',
    image: 'src/assets/images/img13.jpeg',
    rating: 4,
    comment: 'Good quality, but the delivery was a bit slow. Overall, satisfied with the purchase.',
  },
  {
    name: 'Mark Johnson',
    image: 'src/assets/images/img13.jpeg',
    rating: 5,
    comment: 'Amazing experience! Will definitely buy again. The product exceeded my expectations.',
  },
  {
    name: 'Mark Johnson',
    image: 'src/assets/images/img13.jpeg',
    rating: 5,
    comment: 'Amazing experience! Will definitely buy again. The product exceeded my expectations.',
  },
  {
    name: 'Mark Johnson',
    image: 'src/assets/images/img13.jpeg',
    rating: 4,
    comment: 'Amazing experience! Will definitely buy again. The product exceeded my expectations.',
  },
  {
    name: 'Mark Johnson',
    image: 'src/assets/images/img13.jpeg',
    rating: 5,
    comment: 'Amazing experience! Will definitely buy again. The product exceeded my expectations.',
  },
  // Add more reviews as needed
];

const CustomerReviewBanner = () => {
  return (
    <div style={{ padding: '20px', margin: '0 80px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        What Our Customers Are Saying
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {reviews.map((review, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <Avatar
                size={80}
                src={review.image}
                alt={review.name}
                style={{ marginBottom: '15px' }}
              />
              <Title level={4} style={{ marginBottom: '10px' }}>
                {review.name}
              </Title>
              <Rate
                disabled
                value={review.rating}
                character={<StarFilled style={{ color: '#fadb14' }} />}
              />
              <div style={{ marginTop: '10px' }}>
                <Text>{review.comment}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CustomerReviewBanner;
