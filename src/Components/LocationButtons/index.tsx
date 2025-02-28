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
          width: '50px', // Set the button width
          height: '50px', // Set the button height
          padding: 0, // Remove internal padding
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Center the icon in the button
        }}
        onClick={() => window.open(googleMapsUrl, '_blank')}
      >
        <Image
          src={mapsIcon}
          alt="Google Maps"
          preview={false}
          style={{
            width: '100%', // Make image fill the button
            height: '100%', // Make image fill the button
            objectFit: 'cover', // Ensure image aspect ratio is maintained and it fills the button area
          }}
        />
      </Button>

      <Button
        size="large"
        style={{
          width: '50px', // Set the button width
          height: '50px', // Set the button height
          padding: 0, // Remove internal padding
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Center the icon in the button
        }}
        onClick={() => window.open(wazeUrl, '_blank')}
      >
        <Image
          src={wazeIcon}
          alt="Waze"
          preview={false}
          style={{
            width: '100%', // Make image fill the button
            height: '100%', // Make image fill the button
            objectFit: 'cover', // Ensure image aspect ratio is maintained and it fills the button area
          }}
        />
      </Button>
    </Space>
  );
};

export { LocationButtons };
