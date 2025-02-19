import AboutUs from "../AboutUs";
import Home from "../Home";
import Services from "../Services";
import {
  HomeOutlined,
  AlignCenterOutlined,
  UserOutlined,
  ContactsOutlined,
  ReadOutlined,
  PictureOutlined,
} from "@ant-design/icons";

import NotFound from "../NotFound";
import { RouteItem } from "../../Components/AppRoutes";
import { SiderMenuItem } from "../../Components/SiderMenu";
import Testimonies from "../Testimonies";
import { Contact } from "../Contact";
import { Blog } from "../Blog";
import { Gallery } from "../Gallery";
import { SearchResults } from "../SearchResults";

export const routes: RouteItem[] = [
  { path: "/", element: <Home /> },
  { path: "services", element: <Services /> },
  { path: "testimonies", element: <Testimonies /> },
  { path: "contact", element: <Contact /> },
  { path: "about-us", element: <AboutUs /> },
  { path: "blog", element: <Blog /> },
  { path: "gallery", element: <Gallery /> },
  { path: "search", element: <SearchResults /> },
  { path: "*", element: <NotFound /> },
];

export const siderMenuitems: SiderMenuItem[] = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Inicio",
  },
  {
    key: "/services",
    icon: <AlignCenterOutlined />,
    label: "Servicios",
  },
  {
    key: "/testimonies",
    icon: <UserOutlined />,
    label: "Testimonios",
  },
  {
    key: "/contact",
    icon: <ContactsOutlined />,
    label: "Contacto",
  },
  {
    key: "/about-us",
    icon: <AlignCenterOutlined />,
    label: "Acerca de",
  },
  {
    key: "/blog",
    icon: <ReadOutlined />,
    label: "Blog",
  },
  {
    key: "/gallery",
    icon: <PictureOutlined />,
    label: "Galeria",
  },
];
