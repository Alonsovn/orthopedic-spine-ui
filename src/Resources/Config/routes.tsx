import { RouteItem } from '../../Components/AppRoutes';
import AboutUs from '../../Pages/AboutUs';
import { Contact } from '../../Pages/Contact';
import Home from '../../Pages/Home';
import NotFound from '../../Pages/NotFound';
import PrivacyAndCookiesPolicy from '../../Pages/PrivacyAndCookiesPolicy';
import { SearchResults } from '../../Pages/SearchResults';
import { ServiceDetail } from '../../Pages/ServiceDetail';
import Services from '../../Pages/Services';
import Testimonies from '../../Pages/Testimonies';

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
