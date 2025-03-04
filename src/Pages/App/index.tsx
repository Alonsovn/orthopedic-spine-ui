import 'antd/dist/reset.css'; // Import Ant Design CSS

import { AppRoutes } from '../../Components/AppRoutes';
import { SiderMenu } from '../../Components/SiderMenu';
import { Layout } from 'antd';
import { AppHeader } from '../../Components/AppHeader';
import { AppFooter } from '../../Components/AppFooter';
import { AppFloatButton } from '../../Components/AppFloatButton';
import { siderMenuitems } from '../../Resources/Config/siderMenu';
import { routes } from '../../Resources/Config/routes';

const { Content } = Layout;
const contentStyle: React.CSSProperties = {
  margin: '5px 10px',
  padding: 24,
  minHeight: 280,
  overflowY: 'scroll',
  backgroundColor: 'white',
  borderRadius: 10,
};

const App = () => {
  return (
    <Layout style={{ height: '100vh', width: '100%' }}>
      <SiderMenu items={siderMenuitems} />
      <Layout>
        <AppHeader />
        <Content style={contentStyle}>
          <AppRoutes routes={routes} />
        </Content>
        <AppFooter />
      </Layout>
      <AppFloatButton />
    </Layout>
  );
};

export default App;
