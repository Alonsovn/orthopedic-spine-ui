import { Card, Layout, Row, Typography } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const { Title, Text } = Typography;
const { Content } = Layout;

interface ClinicLocationProps {
  position: [number, number];
}

export const ClinicLocation: React.FC<ClinicLocationProps> = ({ position }) => {
  return (
    <Content>
      <Row gutter={[16, 16]}>
        <Card style={{ width: '100%' }}>
          <MapContainer
            center={position || [0, 0]}
            zoom={16}
            scrollWheelZoom={true}
            style={{
              height: '250px',
              width: '100%',
              borderRadius: 10,
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>Orthopedic Spine -100 mts Norte de la Municipalidad de San Rafael, Cartago 📍</Popup>
            </Marker>
          </MapContainer>
        </Card>
      </Row>

      <Row>
        <Card title="Contáctenos" style={{ width: '100%', marginTop: 10, borderRadius: 10 }}>
          <Title level={4}>Orthopedic Spine </Title>
          <Text>100 mts Norte de la Municipalidad de San Rafael, Cartago</Text>

          <div style={{ marginTop: '20px' }}>
            <Title level={5}>Llámenos</Title>
            <a href="tel:+50688888888">+506 8888-8888 </a> | <a href="tel:+5069999999">+506 9999-9999 </a>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Title level={5}>Email</Title>
            <a href="mailto:info.orthopedic_spine@clinics.com">info.orthopedic_spine@clinics.com</a>
          </div>
        </Card>
      </Row>
    </Content>
  );
};
