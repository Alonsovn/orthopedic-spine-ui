import { Card, Carousel, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";

import "./style.css";
import { ServicesCardsProps } from "../types";

const { Meta } = Card;

// export interface ServicesCard {
//   id: number;
//   title: string;
//   description?: string;
//   alt: string;
//   image: string;
// }

// interface ServicesCardsProps {
//   servicesCards: ServicesCard[];
//   slidesToShow: number;
// }

const HomeCarousel: React.FC<ServicesCardsProps> = ({
  servicesCards,
  slidesToShow,
}) => {
  return (
    <Content style={{ padding: "20px" }}>
      <Carousel
        autoplay
        arrows
        slidesToShow={slidesToShow}
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
                  style={{ width: "90%" }}
                  cover={
                    <img alt={service.alt} src={service.image} height={180} />
                  }
                >
                  <Meta
                    title={service.title}
                    description={service.description ? service.description : ""}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        ))}
      </Carousel>
    </Content>
  );
};

export { HomeCarousel };
