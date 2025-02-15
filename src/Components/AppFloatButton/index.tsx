import { WhatsAppOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

const AppFloatButton = () => {
  return (
    <FloatButton
      shape="circle"
      type="primary"
      href="https://web.whatsapp.com/"
      target="_blank"
      style={{ insetInlineEnd: 24 }}
      icon={<WhatsAppOutlined />}
    />
  );
};

export { AppFloatButton };
