import { Col, Row, Typography } from "antd";
import { ContactForm } from "../../Components/ContactForm";
import { ClinicLocation } from "../../Components/ClinicLocation";

const { Title } = Typography;

export const Contact: React.FC = () => {
  const position: [number, number] = [9.868032691676943, -83.90066555786967];

  const onSubmitContactForm = (values: {
    name: string;
    email: string;
    message: string;
    confirm: boolean;
  }) => {
    console.log("Form values: ", values);
  };

  return (
    <Row gutter={[32, 32]} justify="center" style={{ padding: "20px" }}>
      <Col xs={24} sm={24} md={12} lg={10}>
        <Title level={2} style={{ textAlign: "center" }}>
          Contáctenos
        </Title>
        <ContactForm onFinish={onSubmitContactForm} />
      </Col>

      <Col xs={24} sm={24} md={12} lg={10}>
        <Title level={2} style={{ textAlign: "center" }}>
          ¿Cómo llegar?
        </Title>
        <ClinicLocation position={position} />
      </Col>
    </Row>
  );
};
