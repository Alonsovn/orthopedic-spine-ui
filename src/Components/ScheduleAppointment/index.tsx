import { Button, Col, Row } from "antd";

const ScheduleAppointment: React.FC = () => {
  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col>
        <Button type="primary" size="large">
          Agendar una cita
        </Button>
      </Col>
    </Row>
  );
};

export { ScheduleAppointment };
