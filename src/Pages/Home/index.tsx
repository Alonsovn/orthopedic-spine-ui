import { Layout, Typography } from 'antd';
import { LocationSchedule } from '../../Components/LocationSchedule';
import { ScheduleAppointment } from '../../Components/ScheduleAppointment';
import { HomePageCarousel } from '../../Components/AppCarousel/HomePageCarousel';
import { allClinicServices } from '../../Resources/MockData/services';
import { clinicInformation } from '../../Resources/Config/clinicInformation';

const { Title } = Typography;
const { Content } = Layout;

const Home = () => {
  const { name } = clinicInformation;

  return (
    <Content>
      <Title level={1}>{name}</Title>
      <Title level={2}>Servicios</Title>
      <HomePageCarousel services={allClinicServices} slidesToShow={3} />
      <ScheduleAppointment />
      <LocationSchedule />
    </Content>
  );
};

export default Home;
