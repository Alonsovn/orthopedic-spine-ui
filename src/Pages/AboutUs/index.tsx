import { Card, Col, Divider, Layout, Row, Typography } from "antd";
import { Meta } from "react-router-dom";
import { ScheduleAppointment } from "../../Components/ScheduleAppointment";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const teamMembers = [
  {
    id: 1,
    name: "Lic. Aaron Fallas",
    role: "Ortopedista",
    image: "/images/juan.jpg",
  },
  { id: 2, name: "Monica ...", role: "Asistente", image: "/images/maria.jpg" },
  {
    id: 3,
    name: "Noily Naranjo Hidalgo ...",
    role: "Asistente",
    image: "/images/maria.jpg",
  },
];

const AboutUs = () => {
  return (
    <Content>
      <Title level={1}>Sobre Nosotros</Title>
      <Content style={{ textAlign: "left" }}>
        <Row>
          <Col span={24}>
            <Title level={3}> Introducción</Title>
            <Text> Algun texto .....</Text>
          </Col>
        </Row>

        <Divider />

        <Row
          justify="center"
          style={{ textAlign: "center", padding: "40px 20px" }}
        >
          <Col>
            <Title level={2}> ¿Listo para conocernos?</Title>
            <ScheduleAppointment />
          </Col>
        </Row>
      </Content>
    </Content>
  );
};

export default AboutUs;
