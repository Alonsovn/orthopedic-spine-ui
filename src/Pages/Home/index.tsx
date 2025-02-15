import { Typography } from "antd";
import { AppCarousel } from "../../Components/AppCarousel";
import { Content } from "antd/es/layout/layout";
import { servicesCardsItems } from "../../Components/AppCarousel/config";

const { Title } = Typography;

const Home = () => {
  return (
    <Content>
      <Title>Orthopedic Spine</Title>
      <Title level={2}>Servicios</Title>
      <AppCarousel servicesCards={servicesCardsItems} />
    </Content>
  );
};

export default Home;
