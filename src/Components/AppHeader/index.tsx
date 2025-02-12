import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseSiderMenu } from "../../Redux/Slices/uiSlice";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const collapsed = useSelector(
    (state: RootState) => state.ui.siderMenuCollapsed
  );
  return (
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
        onClick={() => dispatch(toggleCollapseSiderMenu())}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
          marginLeft: "10px",
        }}
      />
    </Header>
  );
};

export { AppHeader };
