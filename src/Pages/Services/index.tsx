import { Col, List, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { ServicesCarousel } from '../../Components/AppCarousel/ServicesCarousel';
import { ScheduleAppointment } from '../../Components/ScheduleAppointment';
import { useState } from 'react';
import { allClinicServices } from '../../Resources/MockData/services';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Services = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const currentService = allClinicServices[currentSlide];

  const handleBeforeChange = (_: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  const onClickService = (id: number) => {
    navigate(`/services/${id}`);
  };

  return (
    <Content>
      <Title>Servicios</Title>
      <Row justify={'space-around'} align={'top'}>
        <Col xs={24} sm={24} md={8} lg={6}>
          <ServicesCarousel services={allClinicServices} slidesToShow={1} beforeChange={handleBeforeChange} />
        </Col>
        <Col span={18}>
          <List
            size="small"
            bordered
            dataSource={[currentService]}
            renderItem={(item) => (
              <List.Item style={{ cursor: 'pointer' }} onClick={() => onClickService(item.id)}>
                <List.Item.Meta title={item.title} description={item.description} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <ScheduleAppointment />
    </Content>
  );
};

export default Services;
