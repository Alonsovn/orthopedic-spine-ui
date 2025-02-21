import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import { Content } from "antd/es/layout/layout";

const { Title, Text, Link } = Typography;

interface ContactFormProps {
  onFinish: (values: {
    name: string;
    email: string;
    message: string;
    confirm: boolean;
  }) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onFinish }) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Content id="contactForm">
      <Card style={{ maxWidth: 500, width: "100%" }}>
        <Title level={4} style={{ marginBottom: 0, marginTop: 0 }}>
          Envíe un mensaje
        </Title>
        <Text type="secondary">
          Los campos marcados con "*" son obligatorios.
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: "20px" }}
        >
          <Form.Item
            label="Su nombre *"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre",
              },
            ]}
          >
            <Input placeholder="Su nombre" />
          </Form.Item>

          <Form.Item
            label="Su email *"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su email",
              },
              {
                type: "email",
                message: "Ingrese un email válido",
              },
            ]}
          >
            <Input placeholder="Su email" />
          </Form.Item>

          <Form.Item
            label="Su mensaje *"
            name="message"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su mensaje",
              },
            ]}
          >
            <Input.TextArea placeholder="Su mensaje" rows={4} />
          </Form.Item>

          <Form.Item
            name="confirm"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Debe confirmar para continuar."),
              },
            ]}
          >
            <Checkbox>
              He podido y entiendo la{" "}
              <Link href="/privacy-and-cookies-policy" target="_blank">
                Política de Privacidad y Cookies
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button type="default" onClick={handleReset}>
              Limpiar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "10px" }}
            >
              ENVIAR
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Content>
  );
};
