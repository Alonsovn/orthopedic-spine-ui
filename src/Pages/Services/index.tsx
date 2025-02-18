import { Col, List, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { fullServicesItems } from "./config";
import { ServicesCarousel } from "../../Components/AppCarousel/ServicesCarousel";
import { ScheduleAppointment } from "../../Components/ScheduleAppointment";

const { Title } = Typography;

const Services = () => {
  const tempList = fullServicesItems.map(({ id, title, description }) => ({
    id,
    title,
    description,
  }));
  return (
    <Content>
      <Title>Servicios</Title>
      <Row justify={"space-around"} align={"middle"}>
        <Col span={6}>
          <ServicesCarousel
            servicesCards={fullServicesItems}
            slidesToShow={1}
          />
        </Col>
        <Col span={18}>
          <List
            size="small"
            bordered
            dataSource={tempList}
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
