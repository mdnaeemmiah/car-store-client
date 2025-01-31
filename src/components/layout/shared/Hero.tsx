import { Button, Card, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center px-4 pt-10">
      {/* Title */}
      <h2
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color: "#1677FF",
          marginBottom: "10px",
          textShadow: "2px 2px 20px rgba(0, 25, 0, 0.8)", // Shadow effect
        }}
      >
        Get More Known About Us
      </h2>

      {/* Hero Content */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="max-w-screen-xl w-full flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="flex-1 flex justify-center">
            <img
              src="src/assets/images/img4.avif"
              alt="Hero"
              className="rounded-xl shadow-lg w-full max-w-md h-[550px] object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 flex justify-center">
            <Card className="w-full max-w-md rounded-lg p-6 text-left h-[550px] flex flex-col justify-between">
              <div>
                <Title level={2}>Box Office News!</Title>
                <Paragraph className="text-gray-600">
                  Discover the latest trends in the automobile industry and the key features of modern vehicles.
                </Paragraph>

                {/* Key Points */}
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2" /> Advanced Safety Features
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2" /> Fuel Efficiency & Eco-Friendly Models
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2" /> Smart Technology Integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2" /> Performance & Comfort
                  </li>
                  <li className="flex items-center">
                    <CheckCircleOutlined className="text-green-500 mr-2" /> Cost & Maintenance Considerations
                  </li>
                </ul>
              </div>

              {/* Button */}
              <Button type="primary" size="large" className="mt-10">
  <NavLink to="/about" className="text-white no-underline">
    Learn More
  </NavLink>
</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
