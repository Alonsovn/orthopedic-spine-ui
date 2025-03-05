import { Col, Image, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import build from '../../Assets/images/build.png';

import { LocationButtons } from '../LocationButtons';
import { clinicInformation } from '../../Resources/Config/clinicInformation';

const { Paragraph, Text } = Typography;

const LocationSchedule = () => {
  const { schedule, location } = clinicInformation;

  return (
    <Content>
      <Row justify={'center'} style={{ marginTop: '10px' }}>
        <Col>
          <Text strong style={{ fontSize: '16px' }}>
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
          {schedule.map((day, index) => (
            <Paragraph key={index}> {day} </Paragraph>
          ))}

          <Paragraph strong>Ubicación:</Paragraph>
          <Paragraph>{location.address}</Paragraph>
        </Col>
      </Row>
      <LocationButtons latitude={location.latitude} longitude={location.longitude} />
    </Content>
  );
};

export { LocationSchedule };
