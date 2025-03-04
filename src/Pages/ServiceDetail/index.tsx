import { Alert, Button, Col, Layout, Row, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { allClinicServices } from '../../Resources/MockData/services';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const ServiceDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  //find the service by id
  const service = allClinicServices.find((service) => service.id.toString() === id);

  const onClickBackToSevices = () => {
    navigate('/services');
  };

  if (!service) {
    return (
      <Alert message="Servicio no encontrado" description="El servicio que buscas no existe." type="error" showIcon />
    );
  }

  return (
    <Content style={{ padding: 20, justifyContent: 'center' }}>
      <Row justify="center">
        <Col>
          <Title>{service.title} </Title>
          <Paragraph>{service.description}</Paragraph>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Button type="primary" onClick={onClickBackToSevices}>
            Ir a servicios
          </Button>
        </Col>
      </Row>
    </Content>
  );
};

export { ServiceDetail };
