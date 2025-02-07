import "antd/dist/reset.css"; // Import Ant Design CSS
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { AppMenu } from "../../Components/AppMenu";
import { AppRoutes } from "../../Components/AppRoutes";
import { items, routes } from "./config";
import { ConfigProvider, Layout, theme, Typography } from "antd";
import { useState } from "react";
import Paragraph from "antd/es/typography/Paragraph";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const handleToggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ height: "100vh", width: "100%" }}>
        <Router>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: isDarkMode ? "#181818" : "#F9FAFB",
              padding: "10px 20px",
            }}
          >
            <AppMenu
              items={items}
              isDarkMode={isDarkMode}
              onThemeToggle={handleToggleTheme}
            />
          </Header>

          <Content
            style={{
              padding: "40px",
              margin: "5px",
              background: isDarkMode ? "#181818" : "#f5f5f5",
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            <AppRoutes routes={routes} />
          </Content>

          <Footer style={{ background: isDarkMode ? "#181818" : "#F9FAFB" }}>
            <Typography>
              <Paragraph>Orthopedic Spine</Paragraph>
              <Paragraph>Copyright © devteam Costa Rica</Paragraph>
            </Typography>
          </Footer>
        </Router>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
