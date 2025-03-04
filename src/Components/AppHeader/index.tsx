import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Input, Layout, theme } from 'antd';
import { RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCollapseSiderMenu } from '../../Redux/Slices/uiSlice';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { debounce } from 'lodash';

const { Header } = Layout;
const { Search } = Input;

const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const collapsed = useSelector((state: RootState) => state.ui.siderMenuCollapsed);

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Debounced function to reduce unnecessary state updates
  const debouncedSetSearchQuery = useCallback((search: string) => {
    debounce(() => setSearchQuery(search), 300)();
  }, []);

  const onSearchChange = (search: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchQuery(search.target.value);
  };

  const onSearchSubmit = (search: string) => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <Header
      style={{
        padding: '0 20px',
        background: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(toggleCollapseSiderMenu())}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Search
          placeholder="Buscar..."
          allowClear
          enterButton
          size="large"
          defaultValue={searchQuery}
          onSearch={onSearchSubmit}
          onChange={onSearchChange}
          style={{ width: '100%', maxWidth: 300 }}
        />
      </div>
    </Header>
  );
};

export { AppHeader };
