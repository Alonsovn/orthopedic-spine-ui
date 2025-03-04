import { Card, Col, Divider, Layout, Row, Typography } from 'antd';
import { ScheduleAppointment } from '../../Components/ScheduleAppointment';
import aaronImage from '../../Assets/images/aaron.png';
import colegioImage from '../../Assets/images//colegio.png';
import santaPaulaImage from '../../Assets/images//santaPaula.png';

const { Title, Text } = Typography;
const { Content } = Layout;

const infoItems = [
  {
    id: 1,
    name: 'Lic. Aaron Fallas',
    image: aaronImage,
  },
  { id: 2, name: 'Colegio de terapeutas', image: colegioImage },
  {
    id: 3,
    name: 'Universidad Santa Paula',
    image: santaPaulaImage,
  },
];

const AboutUs = () => {
  return (
    <Content>
      <Title level={1}>Sobre Nosotros</Title>
      <Content style={{ textAlign: 'left' }}>
        <Row>
          <Col span={24}>
            <Title level={3}>Nuestra Historia </Title>
            <Text>
              Desde nuestros inicios, en [Año de Fundación], nos hemos comprometido a brindar un servicio de
              fisioterapia de alta calidad. Nuestro equipo de profesionales altamente capacitados trabaja con pasión y
              dedicación para ayudar a cada paciente a recuperar su movilidad, reducir el dolor y mejorar su calidad de
              vida. Creemos en un enfoque integral, combinando tecnología avanzada con técnicas terapéuticas
              personalizadas.
            </Text>
            <Title level={3}>Nuestra Filosofía</Title>
            <Text>
              En nuestra clínica, cada paciente es único. Nos enfocamos en diseñar tratamientos personalizados que se
              adapten a sus necesidades específicas, promoviendo una recuperación efectiva y duradera. Nuestro
              compromiso va más allá del tratamiento: buscamos educar a nuestros pacientes sobre la prevención de
              lesiones y el mantenimiento de una vida saludable a través de ejercicios, ergonomía y hábitos posturales
              adecuados.
            </Text>
            <Title level={3}>Nuestro Compromiso </Title>
            <Text>
              Sabemos que la salud y el bienestar no pueden esperar. Por ello, ofrecemos un ambiente cálido y
              profesional, donde nuestros pacientes se sientan cómodos y acompañados en cada etapa de su recuperación.
              Nos enorgullece ser un referente en el cuidado fisioterapéutico, ayudando a mejorar la vida de quienes
              confían en nosotros día a día.
            </Text>
          </Col>
        </Row>
        <Divider />

        <Row gutter={[16, 16]}>
          {infoItems.map((item) => (
            <Col key={item.id} xs={24} sm={24} md={12} lg={8}>
              <Card
                hoverable
                style={{ width: 240, borderRadius: 10 }}
                cover={<img alt={item.name} src={item.image} height={210} />}
              >
                <Title level={4}>{item.name}</Title>
              </Card>
            </Col>
          ))}
        </Row>

        <Row justify="center" style={{ textAlign: 'center', padding: '40px 20px' }}>
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
