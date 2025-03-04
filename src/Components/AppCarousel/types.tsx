export interface ServicesCard {
  id: number;
  title: string;
  shortDescription?: string;
  description?: string;
  alt: string;
  image: string;
  isPrimary?: boolean;
}

export interface ServicesCardsProps {
  services: ServicesCard[];
  slidesToShow: number;
}
