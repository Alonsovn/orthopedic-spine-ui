import AboutUs from "../AboutUs";
import ForBusiness from "../ForBusiness";
import Home from "../Home";
import Services from "../Services";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import NotFound from "../NotFound";
import { RouteItem } from "../../Components/AppRoutes";
import { MenuItem } from "../../Components/AppMenu";

export const routes: RouteItem[] = [
  { path: "/", element: <Home /> },
  { path: "services", element: <Services /> },
  { path: "about-us", element: <AboutUs /> },
  { path: "for-business", element: <ForBusiness /> },
  { path: "*", element: <NotFound /> },
];

export const items: MenuItem[] = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Inicio",
  },
  {
    key: "services",
    icon: <AlignLeftOutlined />,
    label: "Servicios",
  },
  {
    key: "about-us",
    icon: <AlignCenterOutlined />,
    label: "Acerca de",
  },
  {
    key: "for-business",
    icon: <AlignRightOutlined />,
    label: "Empresarial",
  },
];
