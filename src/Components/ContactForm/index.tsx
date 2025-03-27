import { Button, Card, Checkbox, Col, Form, Input, Layout, message, Progress, Row, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useReceiveEmailMutation, useSendVerificationCodeEmailMutation } from '../../Api/orthopedicSpineApi';
import { motion } from 'framer-motion';
import { useValidateEmail } from '../../Hooks';
import { buttonStyle, formStyle, inputStyle } from '../../Style';

const { Title, Text, Link } = Typography;
const { Content } = Layout;

const initialFormValues = { name: '', email: '', message: '', confirm: false };
const maxCodeDuration = 300000; //5 minutes

export const ContactForm: React.FC = () => {
  const [form] = Form.useForm();

  const [receiveEmail] = useReceiveEmailMutation();
  const [sendVerificationCodeEmail] = useSendVerificationCodeEmailMutation();

  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [codeExpirationTime, setCodeExpirationTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [showSendCodeVerification, setShowSendCodeVerification] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendEmailDisabled, setIsSendEmailDisabled] = useState(true);

  const validateEmail = useValidateEmail;

  const onValuesChange = useCallback(
    (_, allValues) => {
      // Enable send email button if all required fields are filled and email is verified
      setIsSendEmailDisabled(
        !allValues.name || !allValues.email || !allValues.message || !allValues.confirm || !isEmailVerified,
      );

      if (validateEmail(allValues.email)) {
        setShowSendCodeVerification(true);
      } else {
        setShowSendCodeVerification(false);
      }
    },
    [isEmailVerified, validateEmail],
  );

  const handleReset = useCallback(() => {
    form.resetFields();
    setVerificationCode('');
    setVerificationCodeSent(false);
    setCodeExpirationTime(null);
    setRemainingTime(null);
    setShowSendCodeVerification(false);
    setIsEmailVerified(false);
    setIsSendEmailDisabled(true);
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
      setCodeExpirationTime(Date.now() + maxCodeDuration); //300000 Set expiration time to 5 minutes from now

      message.success('Código de verificación enviado con éxito');
    } catch {
      message.error('Error al enviar el código de verificación. Inténtelo de nuevo.');
    }
  }, [form, sendVerificationCodeEmail]);

  const onSubmitContactForm = useCallback(
    async (values: { name: string; email: string; message: string; confirm: boolean }) => {
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
    [receiveEmail, handleReset],
  );

  const onVerificationCodeChange = (value) => {
    const inputCode = String(value.target.value).trim() || '';
    if (inputCode === String(verificationCode).trim()) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false);
    }
  };

  // Update remaining time every second
  useEffect(() => {
    setIsSendEmailDisabled(!isEmailVerified);

    if (codeExpirationTime) {
      const email = form.getFieldValue('email');
      if (!email) {
        setShowSendCodeVerification(false);
      }

      const interval = setInterval(() => {
        const timeLeft = codeExpirationTime - Date.now();
        setRemainingTime(timeLeft > 0 ? timeLeft : 0);

        if (timeLeft <= 0) {
          clearInterval(interval);
          setVerificationCodeSent(false);
          setVerificationCode('');
          setCodeExpirationTime(null);
          setRemainingTime(null);
          setIsEmailVerified(false);
          message.error('Código expirado. Reenvíe uno nuevo.');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [codeExpirationTime, isEmailVerified, form]);

  return (
    <Content>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card style={formStyle}>
          <Title level={4}>Envíe un mensaje</Title>
          <Text type="secondary">Los campos marcados con "*" son obligatorios.</Text>

          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmitContactForm}
            onValuesChange={onValuesChange}
            autoComplete="off"
            initialValues={initialFormValues}
          >
            <Form.Item
              label="Su nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su nombre',
                },
                {
                  pattern: /^[a-zA-Z\s]{1,}$/,
                  message: 'El nombre debe contener solo letras',
                },
              ]}
            >
              <Input placeholder="Su nombre" style={inputStyle} aria-label="Nombre" />
            </Form.Item>

            <Form.Item
              label="Su email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su email',
                },
                {
                  type: 'email',
                  message: 'Ingrese un email válido',
                },
              ]}
            >
              <Input placeholder="tueemail@ejemplo.com" style={inputStyle} aria-label="Correo Electrónico" />
            </Form.Item>

            {showSendCodeVerification && !verificationCodeSent && (
              <Form.Item>
                <Button type="primary" onClick={onSendVerificationCode} style={buttonStyle}>
                  Enviar código de verificación
                </Button>
              </Form.Item>
            )}

            {verificationCodeSent && remainingTime && (
              <>
                <Form.Item
                  label="Código de verificación"
                  name="verificationCode"
                  rules={[
                    {
                      required: true,
                      message: 'Ingrese el código',
                    },
                  ]}
                >
                  <Input placeholder="Código" onChange={onVerificationCodeChange} maxLength={4} style={inputStyle} />
                </Form.Item>
                <Text type="secondary">Tiempo restante para ingresar el código</Text>
                <Progress percent={(remainingTime / maxCodeDuration) * 100} showInfo={false} />
                <br />
                <Text type="secondary">
                  Si no ves el correo, revisa también tu carpeta de spam o correo no deseado.
                </Text>
              </>
            )}

            <Form.Item
              label="Su mensaje"
              name="message"
              rules={[
                {
                  required: true,
                  message: 'Ingrese su mensaje',
                },
              ]}
            >
              <Input.TextArea
                placeholder="Escriba su mensaje aquí... "
                style={{ ...inputStyle, height: '100px' }}
                aria-label="Mensaje"
                rows={4}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject('Debe aceptar la política.')),
                },
              ]}
            >
              <Checkbox>
                He leído y acepto la{' '}
                <Link href="#/privacy-and-cookies-policy" target="_blank">
                  Política de Privacidad
                </Link>
              </Checkbox>
            </Form.Item>

            <Row justify="end" gutter={10}>
              <Col>
                <Button type="default" onClick={handleReset} style={buttonStyle}>
                  Limpiar
                </Button>
              </Col>
              <Col>
                <Button type="primary" disabled={isSendEmailDisabled} htmlType="submit" style={buttonStyle}>
                  Enviar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </motion.div>
    </Content>
  );
};
