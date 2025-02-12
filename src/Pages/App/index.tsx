import "antd/dist/reset.css"; // Import Ant Design CSS

import "./App.css";
import { AppRoutes } from "../../Components/AppRoutes";
import { routes, siderMenuitems } from "./config";
import { SiderMenu } from "../../Components/SiderMenu";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { toggleCollapseSideMenu } from "../../Redux/Slices/uiSlice";

const { Header, Content } = Layout;

const App = () => {
  const dispatch = useDispatch();

  const collapsed = useSelector(
    (state: RootState) => state.ui.siderMenuCollapsed
  );
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh", width: "100%" }}>
      <SiderMenu items={siderMenuitems} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => dispatch(toggleCollapseSideMenu())}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              marginLeft: "10px",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "5px 10px",
            padding: 24,
            minHeight: 280,
            overflowY: "scroll",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <AppRoutes routes={routes} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
