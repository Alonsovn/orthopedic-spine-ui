import { Card, Layout, Row, Typography } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { clinicInformation } from '../../Resources/Config/clinicInformation';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;
const { Content } = Layout;

export const ClinicLocation: React.FC = () => {
  const { name, location, contact } = clinicInformation;
  const position: [number, number] = [location.latitude, location.longitude];

  return (
    <Content>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Row gutter={[16, 16]} justify={'center'}>
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
                <Popup>
                  `${name} - ${location.address}📍`
                </Popup>
              </Marker>
            </MapContainer>
          </Card>
        </Row>

        <Row justify={'center'}>
          <Card title="Contáctenos" style={{ width: '100%', marginTop: 10, borderRadius: 10 }}>
            <Title level={4}>{name} </Title>
            <Text>{location.address}</Text>

            <div style={{ marginTop: '20px' }}>
              <Title level={5}>Llámenos</Title>
              {contact.phones.map((phone, index) => (
                <a key={index} href={`tel:${phone}`}>
                  {phone}{' '}
                </a>
              ))}
            </div>
            <div style={{ marginTop: '20px' }}>
              <Title level={5}>Email</Title>
              <a href={`mailto:${contact.email}`} style={{ wordBreak: 'break-word' }}>
                {contact.email}
              </a>
            </div>
          </Card>
        </Row>
      </motion.div>
    </Content>
  );
};
