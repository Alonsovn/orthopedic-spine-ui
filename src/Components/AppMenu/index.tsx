import { Dropdown, Menu, Switch } from "antd";
import { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import "./appmenu.css";
import { UserOutlined } from "@ant-design/icons";
import { UserAccountMenu } from "../UserAccountMenu";

export type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
};

export type MenuItemsProps = {
  items: MenuItem[];
  isDarkMode: boolean;
  onThemeToggle: (checked: boolean) => void;
};

const AppMenu: React.FC<MenuItemsProps> = ({
  items,
  isDarkMode,
  onThemeToggle,
}) => {
  const navigate = useNavigate();

  const handleMenuItemClick: MenuProps["onClick"] = (event) => {
    navigate(event.key === "home" ? "/" : `/${event.key}`);
  };

  return (
    <>
      <Menu
        mode="horizontal"
        items={items}
        onClick={handleMenuItemClick}
        style={{
          flex: 1,
          background: "transparent",
          borderBottom: "none",
          justifyContent: "flex-start",
          fontWeight: 500,
        }}
      />

      <Menu
        mode="horizontal"
        style={{
          flex: 1,
          background: "transparent",
          borderBottom: "none",
          justifyContent: "flex-end",
          fontWeight: 500,
        }}
      >
        <Menu.Item key="account" icon={<UserOutlined />}>
          <UserAccountMenu />
        </Menu.Item>
      </Menu>
      <Switch
        checkedChildren="🌙 Dark"
        unCheckedChildren="🌞 Light"
        checked={isDarkMode}
        onChange={onThemeToggle}
        className={`theme-switch ${isDarkMode ? "dark" : "light"}`}
      />
    </>
  );
};

export { AppMenu };
