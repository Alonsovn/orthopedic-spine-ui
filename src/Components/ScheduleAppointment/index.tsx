import { Button, Col, Row } from 'antd';
import { buttonStyle } from '../../Style';

const ScheduleAppointment: React.FC = () => {
  return (
    <Row justify={'center'} style={{ marginTop: '30px' }}>
      <Col>
        <Button type="primary" size="large" style={buttonStyle}>
          Agendar una cita
        </Button>
      </Col>
    </Row>
  );
};

export { ScheduleAppointment };
