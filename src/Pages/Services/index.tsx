import { Col, List, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { fullServicesItems } from "./config";
import { ServicesCarousel } from "../../Components/AppCarousel/ServicesCarousel";
import { ScheduleAppointment } from "../../Components/ScheduleAppointment";
import { useState } from "react";

const { Title } = Typography;

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBeforeChange = (_: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  const currentService = fullServicesItems[currentSlide];

  return (
    <Content>
      <Title>Servicios</Title>
      <Row justify={"space-around"} align={"top"}>
        <Col span={6}>
          <ServicesCarousel
            servicesCards={fullServicesItems}
            slidesToShow={1}
            beforeChange={handleBeforeChange}
          />
        </Col>
        <Col span={18}>
          <List
            size="small"
            bordered
            dataSource={[currentService]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
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
