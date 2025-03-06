import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Input, Layout, theme } from 'antd';
import { RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, toggleCollapseSiderMenu } from '../../Redux/Slices/uiSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useResponsive } from '../../Hooks';
import { useCollapsedButtonStyle, useHeaderStyle } from '../../Style';

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const collapsed = useSelector((state: RootState) => state.ui.siderMenuCollapsed);
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);

  const [inputSearchQuery, setInputSearchQuery] = useState<string>(searchQuery);

  const isMobile = useResponsive();
  const headerStyle = useHeaderStyle(colorBgContainer);
  const collapsedButtonStyle = useCollapsedButtonStyle(isMobile);

  useEffect(() => {
    setInputSearchQuery(searchQuery);
  }, [searchQuery]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchQuery(event.target.value);
  };

  const onSearchSubmit = (search: string) => {
    if (search.trim()) {
      dispatch(setSearchQuery(search));
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <Header style={headerStyle}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(toggleCollapseSiderMenu())}
        style={collapsedButtonStyle}
      />

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Search
          placeholder="Buscar..."
          allowClear
          enterButton
          size="large"
          value={inputSearchQuery}
          onSearch={onSearchSubmit}
          onChange={onSearchChange}
          style={{ width: '100%', maxWidth: 300 }}
        />
      </div>
    </Header>
  );
};

export { AppHeader };
