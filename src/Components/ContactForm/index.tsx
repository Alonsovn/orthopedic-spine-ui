import { Button, Card, Checkbox, Col, Form, Input, message, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useCallback } from 'react';
import { useSendEmailMutation } from '../../Api/orthopedicSpineApi';

const { Title, Text, Link } = Typography;

const initialFormValues = { name: '', email: '', message: '', confirm: false };

export const ContactForm: React.FC = () => {
  const [form] = Form.useForm();

  const [sendEmail] = useSendEmailMutation();

  const handleReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onSubmitContactForm = useCallback(
    async (values: { name: string; email: string; message: string; confirm: boolean }) => {
      try {
        handleReset();
        const payload = {
          fromUser: values.email,
          subject: values.name,
          message: values.message,
        };
        const response = await sendEmail(payload).unwrap();

        if (response.error) {
          message.error('Error al enviar el mensaje. Inténtelo de nuevo.');
          return;
        }

        message.success('Mensaje enviado con éxito');
      } catch {
        message.error('Error al enviar el mensaje. Inténtelo de nuevo.');
      }
    },
    [sendEmail, handleReset],
  );

  return (
    <Content style={{ alignContent: 'center' }}>
      <Card style={{ width: '100%', alignContent: 'center' }}>
        <Title level={4} style={{ marginBottom: 0, marginTop: 0 }}>
          Envíe un mensaje
        </Title>
        <Text type="secondary">Los campos marcados con "*" son obligatorios.</Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmitContactForm}
          autoComplete="off"
          initialValues={initialFormValues}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="Su nombre"
            name="name"
            tooltip={{ title: 'Este campo es requerido' }}
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su nombre',
              },
            ]}
          >
            <Input placeholder="Su nombre" />
          </Form.Item>

          <Form.Item
            label="Su email"
            name="email"
            tooltip={{ title: 'Este campo es requerido' }}
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su email',
              },
              {
                type: 'email',
                message: 'Ingrese un email válido',
              },
            ]}
          >
            <Input placeholder="Su email" />
          </Form.Item>

          <Form.Item
            label="Su mensaje"
            name="message"
            tooltip={{ title: 'Este campo es requerido' }}
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su mensaje',
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
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject('Debe confirmar para continuar.')),
              },
            ]}
          >
            <Checkbox>
              He podido leer y entiendo la{' '}
              <Link href="/privacy-and-cookies-policy" target="_blank">
                Política de Privacidad y Cookies
              </Link>
            </Checkbox>
          </Form.Item>

          <Row justify="end" gutter={10}>
            <Col>
              <Button type="default" onClick={handleReset}>
                Limpiar
              </Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>
                ENVIAR
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Content>
  );
};
