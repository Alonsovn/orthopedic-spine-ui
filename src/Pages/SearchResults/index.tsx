import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, List, Spin, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { allClinicServices } from '../../Resources/MockData/services';

const { Title, Text } = Typography;
const DESCRIPTION_LENGTH = 250;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract search query
  const queryParams = new URLSearchParams(location.search);
  const rawSearchQuery = queryParams.get('q')?.toLowerCase() || '';

  const [searchQuery, setSearchQuery] = useState<string>(rawSearchQuery);
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
    return allClinicServices.filter((service) => {
      const lowerTitle = service.title?.toLowerCase() || '';
      const lowerDescription = service.description?.toLowerCase() || '';

      return lowerTitle.includes(searchQuery) || lowerDescription.includes(searchQuery);
    });
  }, [searchQuery]);

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
            <List.Item onClick={() => onSelectFiteredService(item.id)} style={{ cursor: 'pointer' }}>
              <List.Item.Meta
                title={highlightText(item.title || '', searchQuery)}
                description={highlightText(item.description || '', searchQuery)}
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
