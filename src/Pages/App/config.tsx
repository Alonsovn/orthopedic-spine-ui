import AboutUs from '../AboutUs';
import Home from '../Home';
import Services from '../Services';
import { HomeOutlined, AlignCenterOutlined, UserOutlined, ContactsOutlined } from '@ant-design/icons';

import NotFound from '../NotFound';
import { RouteItem } from '../../Components/AppRoutes';
import { SiderMenuItem } from '../../Components/SiderMenu';
import Testimonies from '../Testimonies';
import { Contact } from '../Contact';
import { SearchResults } from '../SearchResults';
import PrivacyAndCookiesPolicy from '../PrivacyAndCookiesPolicy';
import { ServiceDetail } from '../ServiceDetail';

export const routes: RouteItem[] = [
  { path: '/', element: <Home /> },
  { path: 'services', element: <Services /> },
  { path: 'services/:id', element: <ServiceDetail /> },
  { path: 'testimonies', element: <Testimonies /> },
  { path: 'contact', element: <Contact /> },
  { path: 'about-us', element: <AboutUs /> },
  { path: 'search', element: <SearchResults /> },
  { path: 'privacy-and-cookies-policy', element: <PrivacyAndCookiesPolicy /> },
  { path: '*', element: <NotFound /> },
];

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
