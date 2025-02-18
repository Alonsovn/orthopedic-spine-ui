import { Card, Carousel, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";

import "./style.css";
import { ServicesCardsProps } from "../types";

const { Meta } = Card;

const ServicesCarousel: React.FC<ServicesCardsProps> = ({
  servicesCards,
  slidesToShow,
}) => {
  return (
    <Content style={{ padding: "20px" }}>
      <Carousel autoplay arrows slidesToShow={slidesToShow}>
        {servicesCards.map((service) => (
          <Row key={service.id} gutter={24}>
            <Col span={24}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img alt={service.alt} src={service.image} height={320} />
                }
              >
                <Meta title={service.title} />
              </Card>
            </Col>
          </Row>
        ))}
      </Carousel>
    </Content>
  );
};

export { ServicesCarousel };
