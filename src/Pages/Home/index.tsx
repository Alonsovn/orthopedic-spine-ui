import { Layout, Typography } from 'antd';
import { servicesCardsItems } from './config';
import { LocationSchedule } from '../../Components/LocationSchedule';
import { ScheduleAppointment } from '../../Components/ScheduleAppointment';
import { HomePageCarousel } from '../../Components/AppCarousel/HomePageCarousel';

const { Title } = Typography;
const { Content } = Layout;

const Home = () => {
  return (
    <Content>
      <Title level={1}>Orthopedic Spine</Title>
      <Title level={2}>Servicios</Title>
      <HomePageCarousel servicesCards={servicesCardsItems} slidesToShow={3} />
      <ScheduleAppointment />
      <LocationSchedule />
    </Content>
  );
};

export default Home;
