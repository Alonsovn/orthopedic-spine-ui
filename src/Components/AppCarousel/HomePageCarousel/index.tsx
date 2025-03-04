import { Card, Carousel, Col, Layout, Row } from 'antd';

import { ServicesCardsProps } from '../types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSiderMenuSelectedKey } from '../../../Redux/Slices/uiSlice';
import { useCallback } from 'react';

const { Meta } = Card;
const { Content } = Layout;

export const HomePageCarousel: React.FC<ServicesCardsProps> = ({ services, slidesToShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const principalServices = services.filter((service) => service.isPrimary);

  const handleOnClickCarouselCard = useCallback(
    (serviceId: string) => {
      dispatch(setSiderMenuSelectedKey('/services'));
      navigate(`/services/${serviceId}`);
    },
    [dispatch, navigate],
  );

  return (
    <Content style={{ padding: '20px' }}>
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
        {principalServices.map((service) => (
          <div key={service.id}>
            <Row justify="center" gutter={24}>
              <Col span={24}>
                <Card
                  hoverable
                  style={{ width: '90%' }}
                  cover={<img alt={service.alt} src={service.image} height={180} />}
                  onClick={() => handleOnClickCarouselCard(service.id.toString())}
                >
                  <Meta title={service.title} description={service.shortDescription || ''} />
                </Card>
              </Col>
            </Row>
          </div>
        ))}
      </Carousel>
    </Content>
  );
};
