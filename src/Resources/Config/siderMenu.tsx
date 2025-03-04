import { HomeOutlined, AlignCenterOutlined, UserOutlined, ContactsOutlined } from '@ant-design/icons';
import { SiderMenuItem } from '../../Components/SiderMenu';

export const siderMenuitems: SiderMenuItem[] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: 'Inicio',
  },
  {
    key: '/services',
    icon: <AlignCenterOutlined />,
    label: 'Servicios',
  },
  {
    key: '/testimonies',
    icon: <UserOutlined />,
    label: 'Testimonios',
  },
  {
    key: '/contact',
    icon: <ContactsOutlined />,
    label: 'Contacto',
  },
  {
    key: '/about-us',
    icon: <AlignCenterOutlined />,
    label: 'Acerca de',
  },
];
