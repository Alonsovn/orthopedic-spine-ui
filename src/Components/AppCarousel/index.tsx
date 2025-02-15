import { Button, Card, Carousel, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";

import "./style.css";

const { Meta } = Card;

export interface ServicesCard {
  id: number;
  title: string;
  description: string;
  alt: string;
  image: string;
}

interface ServicesCardsProps {
  servicesCards: ServicesCard[];
}

const AppCarousel: React.FC<ServicesCardsProps> = ({ servicesCards }) => {
  return (
    <Content style={{ padding: "20px" }}>
      <Carousel
        autoplay
        dots={{ className: "custom-carousel-dots" }}
        arrows
        slidesToShow={3}
        centerMode={true}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {servicesCards.map((service) => (
          <div key={service.id}>
            <Row justify="center" gutter={24}>
              <Col span={24}>
                <Card
                  hoverable
                  style={{ width: "60%" }}
                  cover={
                    <img alt={service.alt} src={service.image} height={180} />
                  }
                >
                  <Meta
                    title={service.title}
                    description={service.description}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        ))}
      </Carousel>

      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col>
          <Button type="primary" size="large">
            Agendar una cita
          </Button>
        </Col>
      </Row>
    </Content>
  );
};

export { AppCarousel };
