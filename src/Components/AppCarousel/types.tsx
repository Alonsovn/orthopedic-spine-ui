export interface ServicesCard {
  id: number;
  title: string;
  description?: string;
  alt: string;
  image: string;
}

export interface ServicesCardsProps {
  servicesCards: ServicesCard[];
  slidesToShow: number;
}
