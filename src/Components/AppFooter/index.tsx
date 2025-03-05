import { Col, Layout, Row, Space, Typography } from 'antd';
import { iconsFooter } from '../../Resources/Config/footer';
import { clinicInformation } from '../../Resources/Config/clinicInformation';

const { Footer } = Layout;
const { Text } = Typography;
const AppFooter: React.FC = () => {
  const { name } = clinicInformation;
  return (
    <Footer
      style={{
        textAlign: 'center',
        // background: "#001529",
        color: '#fff',
        padding: '5px 0',
      }}
    >
      <Row justify={'center'} style={{ marginTop: '5px' }}>
        <Col>
          <Text strong style={{ fontSize: '16px' }}>
            {name}
          </Text>
        </Col>
      </Row>
      <Space style={{ marginTop: '5px' }}>
        {iconsFooter.map(({ id, href, target, rel, icon }) => (
          <a key={id} href={href} target={target} rel={rel}>
            {icon}
          </a>
        ))}
      </Space>
      <Row justify={'center'} style={{ marginTop: '5px' }}>
        <Col>
          <Text>Copyright © {new Date().getFullYear()} - Develop by Alonso</Text>
        </Col>
      </Row>
    </Footer>
  );
};

export { AppFooter };
