import AboutUs from "../AboutUs";
import ForBusiness from "../ForBusiness";
import Home from "../Home";
import Services from "../Services";
import { AlignCenterOutlined, HomeOutlined } from "@ant-design/icons";
import NotFound from "../NotFound";
import { RouteItem } from "../../Components/AppRoutes";
import { SiderMenuItem } from "../../Components/SiderMenu";
import Testimonies from "../Testimonies";
import { Contact } from "../Contact";
import { Blog } from "../Blog";
import { Galery } from "../Gallery";
import { baseAppUrl } from "../../Assets/globalVariables";

export const routes: RouteItem[] = [
  { path: `${baseAppUrl}/`, element: <Home /> },
  { path: `${baseAppUrl}services`, element: <Services /> },
  { path: `${baseAppUrl}testimonies`, element: <Testimonies /> },
  { path: `${baseAppUrl}contact`, element: <Contact /> },
  { path: `${baseAppUrl}for-business`, element: <ForBusiness /> },
  { path: `${baseAppUrl}about-us`, element: <AboutUs /> },
  { path: `${baseAppUrl}blog`, element: <Blog /> },
  { path: `${baseAppUrl}gallery`, element: <Galery /> },
  { path: "*", element: <NotFound /> },
];

export const siderMenuitems: SiderMenuItem[] = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Inicio",
  },
  {
    key: "services",
    icon: <AlignCenterOutlined />,
    label: "Servicios",
  },
  {
    key: "testimonies",
    icon: <AlignCenterOutlined />,
    label: "Testimonios",
  },
  {
    key: "contact",
    icon: <AlignCenterOutlined />,
    label: "Contacto",
  },
  {
    key: "for-business",
    icon: <AlignCenterOutlined />,
    label: "Empresarial",
  },
  {
    key: "about-us",
    icon: <AlignCenterOutlined />,
    label: "Acerca de",
  },
  {
    key: "blog",
    icon: <AlignCenterOutlined />,
    label: "Blog",
  },
  {
    key: "gallery",
    icon: <AlignCenterOutlined />,
    label: "Galeria",
  },
];
