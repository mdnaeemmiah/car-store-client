import { Card, Avatar } from 'antd';

import img1 from '../../assets/images/keramot.jpg'
import img2 from '../../assets/images/laila.jpg'
import img3 from '../../assets/images/na.jpg'


const { Meta } = Card;



// Sample data for admin, manager, and staff
const people = [
  {
    id: 1,
    name: 'Naeem',
    role: 'Admin',
    description: 'Senior Developer | Tech Enthusiast | Problem Solver',
    image: img1,
  },
  {
    id: 2,
    name: 'John Doe',
    role: 'Manager',
    description: 'Project Manager | Team Leader',
    image: img2,
  },
  {
    id: 3,
    name: 'Jane Smith',
    role: 'Staff',
    description: 'Frontend Developer | UI/UX Enthusiast',
    image: img3,
  },
  {
    id: 4,
    name: 'Alex Brown',
    role: 'Staff',
    description: 'Backend Developer | Database Specialist',
    image: img1,
  },
  {
    id: 5,
    name: 'Emily White',
    role: 'Manager',
    description: 'Operations Manager | Business Strategist',
    image: img2,
  },
];

const AdminCard = () => (
  <div
    style={{
      maxWidth: '1280px', // Limits max width
      margin: '0 auto', // Centers the container
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center', // Centers the cards horizontally
      padding: '20px',
      marginBottom: 0, // Ensures no extra space at the bottom
    }}
  >
   
    {people.map((person) => (
      <Card
        key={person.id}
        style={{
          width: 350,
          textAlign: 'center',
          marginBottom: 0, // Ensures no extra margin at the bottom of each card
        }}
        cover={
          <Avatar
            size={150}
            src={person.image}
            style={{ margin: '20px auto', display: 'block' }}
          />
        }
      >
        <Meta title={person.name} description={person.description} />
        <p style={{ marginBottom: 0 }}>
          <strong>Role:</strong> {person.role}
        </p>
      </Card>
    ))}
  </div>
);

export default AdminCard;
