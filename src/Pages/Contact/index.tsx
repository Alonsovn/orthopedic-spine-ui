import { Col, Layout, Row, Typography } from 'antd';
import { ContactForm } from '../../Components/ContactForm';
import { ClinicLocation } from '../../Components/ClinicLocation';
import { ScheduleAppointment } from '../../Components/ScheduleAppointment';

const { Title } = Typography;
const { Content } = Layout;

export const Contact: React.FC = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} justify="center" wrap style={{ padding: 10 }}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Content
          style={{
            border: '1px solid #d9d9d9',
            padding: 20,
            borderRadius: 10,
            minHeight: 720,
          }}
        >
          <Title level={2} style={{ textAlign: 'center' }}>
            Contáctenos
          </Title>
          <ContactForm />
        </Content>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <Content style={{ border: '1px solid #d9d9d9', padding: 20, borderRadius: 10 }}>
          <Title level={2} style={{ textAlign: 'center' }}>
            ¿Cómo llegar?
          </Title>
          <ClinicLocation />
        </Content>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <ScheduleAppointment />
      </Col>
    </Row>
  );
};
