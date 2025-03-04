import { Layout, Typography } from 'antd';
import { LocationSchedule } from '../../Components/LocationSchedule';
import { ScheduleAppointment } from '../../Components/ScheduleAppointment';
import { HomePageCarousel } from '../../Components/AppCarousel/HomePageCarousel';
import { allClinicServices } from '../../Resources/MockData/services';

const { Title } = Typography;
const { Content } = Layout;

const Home = () => {
  return (
    <Content>
      <Title level={1}>Orthopedic Spine</Title>
      <Title level={2}>Servicios</Title>
      <HomePageCarousel services={allClinicServices} slidesToShow={3} />
      <ScheduleAppointment />
      <LocationSchedule />
    </Content>
  );
};

export default Home;
