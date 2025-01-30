import Accordion from './Accordion';
import AdminCard from './Cart';

const AboutUs = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{
                fontSize: '30px',
                fontWeight: 'bold',
                color: '#1677FF',
                textShadow: '2px 2px 20px rgba(0, 25, 0, 0.8)', // Orange shadow effect
            }}>
                About Our Company
            </h2>
            <AdminCard />

            <h2 style={{
                fontSize: '30px',
                fontWeight: 'bold',
                color: '#1677FF',
                textShadow: '2px 2px 20px rgba(0, 25, 0, 0.8)', // Orange shadow effect
                marginTop: '40px'
            }}>
                What You Are Thinking About Us
            </h2>
            <Accordion />
        </div>
    );
};

export default AboutUs;
