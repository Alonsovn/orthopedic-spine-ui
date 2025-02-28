import { useLocation, useNavigate } from 'react-router-dom';
import { List, Typography } from 'antd';
import { fullServicesItems } from '../Services/config';

const { Title } = Typography;

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract search query
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q')?.toLowerCase() || '';

  // Filter services that match the query
  const filteredResults = fullServicesItems.filter(
    (service) => service.title.toLowerCase().includes(query) || service.description?.toLowerCase().includes(query),
  );

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Search Results for "{query}"</Title>

      {filteredResults.length > 0 ? (
        <List
          bordered
          dataSource={filteredResults}
          renderItem={(item) => (
            <List.Item
              //   onClick={() => navigate(`/services/${item.id}`)} # TODO redirect to the proper clinic service
              onClick={() => navigate('/services')}
              style={{ cursor: 'pointer' }}
            >
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export { SearchResults };
