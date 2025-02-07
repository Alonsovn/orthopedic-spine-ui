import { Col, Divider, Layout, Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { baseAppUrl } from "../../Assets/globalVariables";

const { Sider } = Layout;

export type SiderMenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

export type SiderMenuItemsProps = {
  items: SiderMenuItem[];
  collapsed: boolean;
};

const SiderMenu: React.FC<SiderMenuItemsProps> = ({ items, collapsed }) => {
  const navigate = useNavigate();

  const handleOnSelectMenu = (item: { key: string }) => {
    navigate(item.key == "/" ? baseAppUrl : `${baseAppUrl}${item.key}`);
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
        items={items}
        onSelect={handleOnSelectMenu}
      ></Menu>
    </Sider>
  );
};

export { SiderMenu };
