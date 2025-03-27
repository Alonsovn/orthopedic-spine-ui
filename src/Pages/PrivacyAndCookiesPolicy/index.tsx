import React from 'react';
import { Typography, List } from 'antd';
import { sectionData } from '../../Resources/Config/policyCookies';

const { Title, Paragraph, Text } = Typography;

const styleTitle: React.CSSProperties = {
  textAlign: 'justify',
};

const PrivacyAndCookiesPolicy: React.FC = () => {
  return (
    <Typography>
      <Title level={1} style={styleTitle}>
        Política de Privacidad y Cookies
      </Title>

      <Paragraph>
        En Orthopedic Spine, nos comprometemos a proteger la privacidad de nuestros usuarios y al tratamiento adecuado
        de sus datos personales conforme a la Ley, cuando corresponda.
      </Paragraph>

      {sectionData.map((section, index) => (
        <div key={index}>
          {section.title && <Title level={3}>{section.title}</Title>}
          {section.subTitle && <Paragraph>{section.subTitle}</Paragraph>}
          <List
            dataSource={section.items}
            renderItem={(item) => (
              <List.Item>
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </div>
      ))}

      <Paragraph style={{ marginTop: '20px' }}>
        <Text strong>Nunca vendemos tus datos personales.</Text>
      </Paragraph>

      <Title level={3}>Contacto</Title>
      <Paragraph>
        Si tienes preguntas o deseas ejercer tus derechos de privacidad:
        <br />
        <Text strong>Email:</Text> info@orthopedic-spine.com
      </Paragraph>
    </Typography>
  );
};

export default PrivacyAndCookiesPolicy;
