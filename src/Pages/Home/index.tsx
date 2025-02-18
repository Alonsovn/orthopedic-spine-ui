import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { servicesCardsItems } from "./config";
import { LocationSchedule } from "../../Components/LocationSchedule";
import { ScheduleAppointment } from "../../Components/ScheduleAppointment";
import { HomeCarousel } from "../../Components/AppCarousel/HomeCarousel";

const { Title } = Typography;

const Home = () => {
  return (
    <Content>
      <Title>Orthopedic Spine</Title>
      <Title level={2}>Servicios</Title>
      <HomeCarousel servicesCards={servicesCardsItems} slidesToShow={3} />
      <ScheduleAppointment />
      <LocationSchedule />
    </Content>
  );
};

export default Home;
