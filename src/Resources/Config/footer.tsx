import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';

const ICON_SIZE = 24;

export interface AppIcon {
  id: number;
  href: string;
  target: string;
  rel: string;
  icon: React.ReactNode;
}

export const iconsFooter: readonly AppIcon[] = [
  {
    id: 1,
    href: 'https://www.facebook.com/share/12FDcXXvESd/',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: <FacebookOutlined style={{ fontSize: ICON_SIZE, marginRight: '10px' }} />,
  },
  {
    id: 2,
    href: 'https://www.instagram.com/orthopedic_spine_s?igsh=bHY2cHZ2MXd4dzIz',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: <InstagramOutlined style={{ fontSize: ICON_SIZE, marginRight: '10px' }} />,
  },
  {
    id: 3,
    href: 'https://www.youtube.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: <YoutubeOutlined style={{ fontSize: ICON_SIZE, marginRight: '10px' }} />,
  },
];
