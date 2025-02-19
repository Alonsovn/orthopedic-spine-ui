import { Col, Divider, Layout, Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { setSiderMenuSelectedKey } from "../../Redux/Slices/uiSlice";

const { Sider } = Layout;

export interface SiderMenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

export interface SiderMenuItemsProps {
  items: SiderMenuItem[];
}

const SiderMenu: React.FC<SiderMenuItemsProps> = ({ items }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const collapsed = useSelector(
    (state: RootState) => state.ui.siderMenuCollapsed
  );
  const siderMenuSelectedKey = useSelector(
    (state: RootState) => state.ui.siderMenuSelectedKey
  );

  const handleOnSelectMenu = (item: { key: string }) => {
    dispatch(setSiderMenuSelectedKey(item.key));
    navigate(item.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Row>
        <Col span={20}>
          <img
            src={logo}
            alt="logo"
            loading="lazy"
            style={{
              width: 80,
              height: 60,
              paddingInline: 5,
              marginTop: 10,
              borderRadius: 30,
            }}
          />
        </Col>
        <Divider style={{ borderColor: "white" }}></Divider>
      </Row>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        selectedKeys={[siderMenuSelectedKey]}
        items={items}
        onSelect={handleOnSelectMenu}
      ></Menu>
    </Sider>
  );
};

export { SiderMenu };
