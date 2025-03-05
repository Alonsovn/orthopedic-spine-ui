import { Button, Image, Space } from 'antd';
import React from 'react';
import wazeIcon from '../../Assets/images/waze.png';
import mapsIcon from '../../Assets/images/maps.png';

interface LocationProps {
  latitude: number;
  longitude: number;
}

const LocationButtons: React.FC<LocationProps> = ({ latitude, longitude }) => {
  // Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  // Waze URL
  const wazeUrl = `https://waze.com/ul?q=${latitude},${longitude}`;

  return (
    <Space style={{ marginTop: '5px' }}>
      <Button
        size="large"
        style={{
          width: '50px',
          height: '50px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => window.open(googleMapsUrl, '_blank')}
      >
        <Image
          src={mapsIcon}
          alt="Google Maps"
          preview={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Button>

      <Button
        size="large"
        style={{
          width: '50px',
          height: '50px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => window.open(wazeUrl, '_blank')}
      >
        <Image
          src={wazeIcon}
          alt="Waze"
          preview={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Button>
    </Space>
  );
};

export { LocationButtons };
