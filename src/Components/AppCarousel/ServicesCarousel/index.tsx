import { Card, Carousel } from "antd";
import { Content } from "antd/es/layout/layout";

import "./style.css";
import { ServicesCardsProps } from "../types";

const { Meta } = Card;

interface ServicesCarouselProps extends ServicesCardsProps {
  beforeChange?: (oldIndex: number, newIndex: number) => void;
}

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({
  servicesCards,
  slidesToShow,
  beforeChange,
}) => {
  return (
    <Content style={{ padding: "20px" }}>
      <Carousel
        autoplay
        arrows
        slidesToShow={slidesToShow}
        beforeChange={beforeChange}
      >
        {servicesCards.map((service) => (
          <div key={service.id}>
            <Card
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  alt={service.alt}
                  src={service.image}
                  height={320}
                  style={{ objectFit: "cover" }}
                />
              }
            >
              <Meta title={service.title} />
            </Card>
          </div>
        ))}
      </Carousel>
    </Content>
  );
};

export { ServicesCarousel };
