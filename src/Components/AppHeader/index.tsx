import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Input, Layout, theme } from "antd";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseSiderMenu } from "../../Redux/Slices/uiSlice";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const collapsed = useSelector(
    (state: RootState) => state.ui.siderMenuCollapsed
  );

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <Header
      style={{
        padding: "0 20px",
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
        }}
      />

      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <Search
          placeholder="Search..."
          allowClear
          enterButton
          size="large"
          onSearch={handleSearch}
          style={{ width: "100%", maxWidth: 300 }}
        />
      </div>
    </Header>
  );
};

export { AppHeader };
