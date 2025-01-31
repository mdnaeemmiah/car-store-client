import { Typography, Button, Space } from 'antd';
import { GithubOutlined, DribbbleOutlined, TwitterOutlined, MailOutlined } from '@ant-design/icons';
import image from '../../../assets/images/na.jpg';

const { Title, Text } = Typography;

const UDashboard = () => (
  <div className="p-6 sm:p-12">
    <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
      <img
        src={image}
        alt="Profile"
        className="self-center flex-shrink-0 w-48 h-48 border rounded-full md:justify-self-start"
      />
      <div className="flex flex-col">
        <Title level={4} className="text-center md:text-left">
          Naeem Jenkins
        </Title>
        <Text className="dark:text-gray-600">
          Sed non nibh iaculis, posuere diam vitae, consectetur neque. Integer velit ligula, semper sed nisl in,
          cursus commodo elit. Pellentesque sit amet mi luctus ligula euismod lobortis ultricies et nibh.
        </Text>
      </div>
    </div>
    <div className="flex justify-center pt-4 space-x-8 align-center ">
      <Space size="middle">
        <Button
          icon={<GithubOutlined style={{ fontSize: '30px' }} />}
          shape="circle"
          type="link"
          href="#"
          aria-label="GitHub"
          className="dark:text-gray-800 hover:dark:text-violet-600"
        />
        <Button
          icon={<DribbbleOutlined style={{ fontSize: '30px' }} />}
          shape="circle"
          type="link"
          href="#"
          aria-label="Dribble"
          className="dark:text-gray-800 hover:dark:text-violet-600"
        />
        <Button
          icon={<TwitterOutlined style={{ fontSize: '30px' }} />}
          shape="circle"
          type="link"
          href="#"
          aria-label="Twitter"
          className="dark:text-gray-800 hover:dark:text-violet-600"
        />
        <Button
          icon={<MailOutlined style={{ fontSize: '30px' }} />}
          shape="circle"
          type="link"
          href="#"
          aria-label="Email"
          className="dark:text-gray-800 hover:dark:text-violet-600"
        />
      </Space>
    </div>
  </div>
);

export default UDashboard;
