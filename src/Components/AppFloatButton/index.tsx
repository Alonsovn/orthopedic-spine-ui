import { WhatsAppOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { clinicInformation } from '../../Resources/Config/clinicInformation';

const AppFloatButton = () => {
  const phoneNumber = clinicInformation.contact.phones[0].replace(/\D/g, ''); // Remove non-digit characters
  const whatsAppMessage = 'Hola, tengo una consulta sobre Orthopedic Spine';
  const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsAppMessage)}`;
  return (
    <FloatButton
      shape="circle"
      type="primary"
      href={whatsAppLink}
      target="_blank"
      style={{ insetInlineEnd: 24 }}
      icon={<WhatsAppOutlined />}
    />
  );
};

export { AppFloatButton };
