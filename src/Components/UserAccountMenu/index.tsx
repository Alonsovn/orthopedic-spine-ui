import { Avatar, Dropdown, Menu, MenuProps, Space, Switch } from "antd";
import "./userAccountMenu.css";
import { useState } from "react";
import {
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Profile",
  },
  {
    key: "3",
    label: "Settings",
    icon: <SettingOutlined />,
  },
  {
    key: "4",
    label: "Logout",
    icon: <LoginOutlined />,
  },
];

const UserAccountMenu: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();

  const onThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  return (
    <>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Alonso
            <UserOutlined />
          </Space>
        </a>
      </Dropdown>

      {/* <Switch
          checkedChildren="🌙 Dark"
          unCheckedChildren="🌞 Light"
          checked={isDarkMode}
          onChange={onThemeToggle}
          className={`theme-switch ${isDarkMode ? "dark" : "light"}`}
        /> */}
    </>
  );
};

export { UserAccountMenu };
