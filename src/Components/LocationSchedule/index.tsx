import { Col, Image, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import build from "../../Assets/images/build.png";

import { LocationButtons } from "../LocationButtons";

const { Paragraph, Text } = Typography;

const LocationSchedule = () => {
  const latitude = 9.867991678313302;
  const longitude = -83.90066253311242;

  return (
    <Content>
      <Row justify={"center"} style={{ marginTop: "10px" }}>
        <Col>
          <Text strong style={{ fontSize: "16px" }}>
            Ubicación y Horario:
          </Text>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Image width={150} height={110} src={build} alt="Ubicación" />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Paragraph strong>Nuestro Horario:</Paragraph>
          <Paragraph>Lunes a viernes: 7am - 7pm</Paragraph>
          <Paragraph>Sábado 7am: - 12md</Paragraph>
          <Paragraph strong>Ubicación:</Paragraph>
          <Paragraph>Diagonal al Área de Salud de, Provincia de Cartago, San Rafael</Paragraph>
        </Col>
      </Row>
      <LocationButtons latitude={latitude} longitude={longitude} />
    </Content>
  );
};

export { LocationSchedule };
