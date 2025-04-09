import { RouteItem } from '../../Components/AppRoutes';
import AboutUs from '../../Pages/AboutUs';
import { Contact } from '../../Pages/Contact';
import Home from '../../Pages/Home';
import Login from '../../Pages/Login';
import NotFound from '../../Pages/NotFound';
import PrivacyAndCookiesPolicy from '../../Pages/PrivacyAndCookiesPolicy';
import { SearchResults } from '../../Pages/SearchResults';
import { ServiceDetail } from '../../Pages/ServiceDetail';
import Services from '../../Pages/Services';
import Testimonies from '../../Pages/Testimonials';

export const routes: RouteItem[] = [
  { path: '/', element: <Home /> },
  { path: 'services', element: <Services /> },
  { path: 'services/:id', element: <ServiceDetail /> },
  { path: 'testimonies', element: <Testimonies /> },
  { path: 'contact', element: <Contact /> },
  { path: 'about-us', element: <AboutUs /> },
  { path: 'search', element: <SearchResults /> },
  { path: 'privacy-and-cookies-policy', element: <PrivacyAndCookiesPolicy /> },
  { path: 'login', isPublicOnly: true, element: <Login /> },
  { path: 'logout', isPrivate: true, element: <div>Logout</div> },
  { path: 'admin', isPrivate: true, element: <h1>Adming page</h1> },

  { path: '*', element: <NotFound /> },
];
