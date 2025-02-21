import { Card, Col, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const { Title, Text } = Typography;

interface ClinicLocationProps {
  position: readonly [number, number];
}

export const ClinicLocation: React.FC<ClinicLocationProps> = ({ position }) => {
  return (
    <Content style={{ padding: "20px", textAlign: "center" }}>
      {/* <Row justify={"center"} gutter={[16, 16]}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card title="Nuestra Ubicación" style={{ width: "100%" }}>
            <MapContainer
              center={position}
              zoom={17}
              scrollWheelZoom={false}
              style={{ height: "250px", width: "100%", borderRadius: "10px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>Clínica Ortopédica - Ubicación Exacta</Popup>
              </Marker>
            </MapContainer>
          </Card>
        </Col>
      </Row> */}

      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card
            title="Contáctenos"
            style={{ width: "100%", textAlign: "left" }}
          >
            <Title level={4}>Orthopedic Spine </Title>
            <Text>
              100 mts Norte de la Municipalidad de San Rafael, Cartago
            </Text>

            <div id="clinicInfo" style={{ marginTop: "20px" }}>
              <Title level={5}>Llámenos</Title>
              <a href="tel:+50688888888">+506 8888-8888 </a> |{" "}
              <a href="tel:+5069999999">+506 9999-9999 </a>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Title level={5}>Email</Title>
              <a href="mailto:info.orthopedic_spine@clinics.com">
                info.orthopedic_spine@clinics.com
              </a>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};
