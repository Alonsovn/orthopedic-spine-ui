import { Card, Carousel } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { ServicesCardsProps } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const { Meta } = Card;

interface ServicesCarouselProps extends ServicesCardsProps {
  beforeChange?: (oldIndex: number, newIndex: number) => void;
}

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ services, slidesToShow, beforeChange }) => {
  const navigate = useNavigate();

  const onClickCarouselCard = useCallback(
    (serviceId: string) => {
      navigate(`/services/${serviceId}`);
    },
    [navigate],
  );

  return (
    <Content style={{ padding: '20px' }}>
      <Carousel autoplay arrows slidesToShow={slidesToShow} beforeChange={beforeChange}>
        {services.map((service) => (
          <div key={service.id}>
            <Card
              hoverable
              style={{ width: '100%' }}
              cover={<img alt={service.alt} src={service.image} height={320} style={{ objectFit: 'cover' }} />}
              onClick={() => onClickCarouselCard(service.id.toString())}
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
