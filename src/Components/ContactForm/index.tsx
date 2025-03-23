import { Button, Card, Checkbox, Col, Form, Input, message, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useCallback, useEffect, useState } from 'react';
import { useReceiveEmailMutation, useSendVerificationCodeEmailMutation } from '../../Api/orthopedicSpineApi';

const { Title, Text, Link } = Typography;

const initialFormValues = { name: '', email: '', message: '', confirm: false };

export const ContactForm: React.FC = () => {
  const [form] = Form.useForm();

  const [receiveEmail] = useReceiveEmailMutation();
  const [sendVerificationCodeEmail] = useSendVerificationCodeEmailMutation();

  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [codeExpiredTime, setCodeExpiredTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const handleReset = useCallback(() => {
    form.resetFields();
    setVerificationCodeSent(false);
    setVerificationCode('');
    setCodeExpiredTime(null);
    setRemainingTime(null);
  }, [form]);

  const onSendVerificationCode = useCallback(async () => {
    try {
      const email = form.getFieldValue('email');
      if (!email) {
        message.error('Por favor ingrese su email primero.');
        return;
      }

      const response = await sendVerificationCodeEmail({ email }).unwrap();

      if (response.error) {
        message.error('Error al enviar el código de verificación. Inténtelo de nuevo.');
        return;
      }

      setVerificationCodeSent(true);
      setVerificationCode(response.verificationCode);
      console.log('Verification code : ', response.verificationCode);
      setCodeExpiredTime(Date.now() + 100000); //300000 Set expiration time to 5 minutes from now

      message.success('Código de verificación enviado con éxito');
    } catch {
      message.error('Error al enviar el código de verificación. Inténtelo de nuevo.');
    }
  }, [form, sendVerificationCodeEmail]);

  const onSubmitContactForm = useCallback(
    async (values: { name: string; email: string; message: string; confirm: boolean }) => {
      if (verificationCodeSent) {
        const verificationCodeValue = form.getFieldValue('verificationCode')?.trim() || '';
        if (!verificationCodeValue) {
          message.error('Por favor, ingrese el código de verificación.');
          return;
        }
        if (Date.now() > (codeExpiredTime ?? 0)) {
          message.error('El código de verificación ha expirado. Inténtelo de nuevo.');
          return;
        }

        if (verificationCodeValue !== String(verificationCode)) {
          message.error('Código de verificación incorrecto. Inténtelo de nuevo.');
          return;
        }
      }

      try {
        handleReset();
        const payload = {
          fromUser: values.email,
          subject: values.name,
          message: values.message,
        };
        const response = await receiveEmail(payload).unwrap();

        if (response.error) {
          message.error('Error al enviar el mensaje. Inténtelo de nuevo.');
          return;
        }

        message.success('Mensaje enviado con éxito');
      } catch {
        message.error('Error al enviar el mensaje. Inténtelo de nuevo.');
      }
    },
    [receiveEmail, handleReset, verificationCodeSent, verificationCode, codeExpiredTime, form],
  );

  // Update remaining time every second
  useEffect(() => {
    if (codeExpiredTime) {
      const interval = setInterval(() => {
        const timeLeft = codeExpiredTime - Date.now();
        setRemainingTime(timeLeft > 0 ? timeLeft : 0);

        if (timeLeft <= 0) {
          clearInterval(interval);
          setVerificationCodeSent(false);
          setVerificationCode('');
          message.error('El código de verificación ha expirado. Por favor, re-genere el código.');
          setCodeExpiredTime(null);
          setRemainingTime(null);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [codeExpiredTime]);

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

          <Form.Item>
            <Button type="primary" onClick={onSendVerificationCode}>
              Enviar código de verificación
            </Button>
          </Form.Item>

          {!!verificationCodeSent && (
            <Form.Item
              label="Código de verificación"
              name="verificationCode"
              tooltip={{ title: 'Este campo es requerido' }}
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese el código de verificación',
                },
              ]}
            >
              <Input placeholder="Código de verificación" />
            </Form.Item>
          )}
          {remainingTime && (
            <Text type="secondary">
              El Tiempo restante para ingrear el código: {Math.floor(remainingTime / 1000)} segundos
            </Text>
          )}

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
                Enviar
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Content>
  );
};
