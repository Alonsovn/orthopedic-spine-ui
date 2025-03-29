import { Col, Divider, Layout, Menu, message, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setSearchQuery, setSiderMenuSelectedKey } from '../../Redux/Slices/uiSlice';
import { useCallback, useEffect, useState } from 'react';
import { useDividerStyle, useLogoStyle } from '../../Style';
import { logout } from '../../Redux/Slices/userSlice';
import { LogoutOutlined } from '@ant-design/icons';

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

  const logoStyle = useLogoStyle();
  const dividerStyle = useDividerStyle();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { collapsed, siderMenuSelectedKey } = useSelector(
    (state: RootState) => ({
      collapsed: state.ui.siderMenuCollapsed,
      siderMenuSelectedKey: state.ui.siderMenuSelectedKey,
    }),
    shallowEqual,
  );
  const { loggedIn } = useSelector(
    (state: RootState) => ({
      loggedIn: state.user.loggedIn,
    }),
    shallowEqual,
  );

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOnSelectMenu = useCallback(
    (item: { key: string }) => {
      dispatch(setSearchQuery(''));
      dispatch(setSiderMenuSelectedKey(item.key));
      navigate(item.key);
    },
    [dispatch, navigate],
  );

  const onClickLogo = () => {
    navigate('/');
  };

  const onLogout = () => {
    dispatch(logout());
    message.success('Cierre de sesión exitoso!');
    navigate('/');
  };

  return (
    <Sider width={150} collapsedWidth={90} trigger={null} collapsible collapsed={collapsed || isMobile}>
      <Row justify="center" align="middle">
        <Col span={20}>
          <img src={logo} alt="logo" loading="lazy" style={logoStyle} onClick={onClickLogo} />
        </Col>
        <Divider style={dividerStyle} />
      </Row>

      <div
        style={{
          height: '85%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[siderMenuSelectedKey]}
          items={items}
          onSelect={handleOnSelectMenu}
        />

        {!!loggedIn && (
          <div>
            <Divider style={dividerStyle} />
            <Menu
              theme="dark"
              mode="inline"
              items={[
                {
                  key: '/logout',
                  icon: <LogoutOutlined />,
                  label: 'Salir',
                },
              ]}
              onSelect={onLogout}
              style={{ marginTop: 'auto' }} // Ensures it stays at the bottom
            />
          </div>
        )}
      </div>
    </Sider>
  );
};

export { SiderMenu };
