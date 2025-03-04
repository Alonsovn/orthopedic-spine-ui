import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, List, Spin, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fullServicesItems } from '../Services/config';
import { debounce } from 'lodash';

const { Title } = Typography;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract search query
  const queryParams = new URLSearchParams(location.search);
  const rawSearchQuery = queryParams.get('q')?.toLowerCase() || '';

  const [searchQuery, setSearchQuery] = useState<string>(rawSearchQuery.toLowerCase());
  const [loading, setLoading] = useState(false);

  // Debounced function to update searchQuery state
  const debouncedSetSearchQuery = useMemo(
    () =>
      debounce((search: string) => {
        setSearchQuery(search);
      }, 300),
    [],
  );

  useEffect(() => {
    debouncedSetSearchQuery(rawSearchQuery);
    return () => {
      debouncedSetSearchQuery.cancel(); // Clean up debounce on unmount
    };
  }, [rawSearchQuery, debouncedSetSearchQuery]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Memoized filtering of services
  const filteredServices = useMemo(() => {
    return fullServicesItems.filter(
      (service) =>
        service.title.toLowerCase().includes(searchQuery) || service.description?.toLowerCase().includes(searchQuery),
    );
  }, [searchQuery]);

  const onSelectFiteredService = (id: number) => {
    navigate(`/services/${id}`);
    //TODO clean up search query on navbar
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Resultados de la búsqueda: "{searchQuery}"</Title>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Spin size="large" />
        </div>
      ) : filteredServices.length > 0 ? (
        <List
          size="small"
          bordered
          dataSource={filteredServices}
          renderItem={(item) => (
            <List.Item onClick={onSelectFiteredService.bind(null, item.id)} style={{ cursor: 'pointer' }}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      ) : (
        <Alert message="No se encontraron resultados" type="warning" />
      )}
    </div>
  );
};

export { SearchResults };
