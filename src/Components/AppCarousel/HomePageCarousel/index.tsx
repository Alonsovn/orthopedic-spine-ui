import { Card, Carousel, Col, Layout, Row } from "antd";

import { ServicesCardsProps } from "../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSiderMenuSelectedKey } from "../../../Redux/Slices/uiSlice";
import { useCallback } from "react";

const { Meta } = Card;
const { Content } = Layout;

export const HomePageCarousel: React.FC<ServicesCardsProps> = ({
  servicesCards,
  slidesToShow,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClickCarouselCard = useCallback(() => {
    dispatch(setSiderMenuSelectedKey("/services"));
    navigate("/services");
  }, [dispatch, navigate]);

  return (
    <Content style={{ padding: "20px" }}>
      <Carousel
        autoplay
        arrows
        slidesToShow={slidesToShow}
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
                  onClick={() => handleOnClickCarouselCard()}
                >
                  <Meta
                    title={service.title}
                    description={service.description || ""}
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
