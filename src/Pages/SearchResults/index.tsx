import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, List, Spin, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { allClinicServices } from '../../Resources/MockData/services';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../Redux/Slices/uiSlice';

const { Title, Text } = Typography;
const DESCRIPTION_LENGTH = 250;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract search query
  const queryParams = new URLSearchParams(location.search);
  const rawSearchQuery = queryParams.get('q')?.toLowerCase() || '';

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [rawSearchQuery]);

  // Memoized filtering of services
  const filteredServices = useMemo(() => {
    return allClinicServices.filter((service) => {
      const lowerTitle = service.title?.toLowerCase() || '';
      const lowerDescription = service.description?.toLowerCase() || '';

      return lowerTitle.includes(rawSearchQuery) || lowerDescription.includes(rawSearchQuery);
    });
  }, [rawSearchQuery]);

  const highlightText = (text: string, search: string) => {
    if (!search.trim()) return text;

    const lowerText = text.toLowerCase();
    const lowerSearch = search.toLowerCase();
    const firstMatchIndex = lowerText.indexOf(lowerSearch);

    if (firstMatchIndex === -1) return text;

    const startText = Math.max(0, firstMatchIndex - DESCRIPTION_LENGTH); // Get 100 chars before match
    const endText = Math.min(text.length, firstMatchIndex + lowerSearch.length + 100); // Get 100 chars after match
    const excerptText = text.substring(startText, endText);

    // Ensure it doesn't cut off a word at the beginning
    const adjustedStart = startText > 0 ? excerptText.indexOf(' ') + 1 : 0;
    const trimmedText = excerptText.substring(adjustedStart);

    const regex = new RegExp(`(${search})`, 'gi');
    return trimmedText.split(regex).map((part, index) =>
      part.toLowerCase() === lowerSearch ? (
        <Text key={index} strong>
          {part}
        </Text>
      ) : (
        part
      ),
    );
  };

  const onSelectFilteredService = (id: number) => {
    navigate(`/services/${id}`);
    dispatch(setSearchQuery(''));
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Resultados de la búsqueda: "{rawSearchQuery}"</Title>

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
            <List.Item onClick={() => onSelectFilteredService(item.id)} style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                title={highlightText(item.title || '', rawSearchQuery)}
                description={highlightText(item.description || '', rawSearchQuery)}
              />
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
