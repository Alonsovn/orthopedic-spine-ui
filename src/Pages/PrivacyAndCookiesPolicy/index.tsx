import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;
const styleTitle: React.CSSProperties = {
  textAlign: 'center',
};

const PrivacyAndCookiesPolicy = () => {
  return (
    <>
      <Typography>
        <Title level={1} style={styleTitle}>
          Politica de Privacidad y Cookies
        </Title>
        <Paragraph>
          XXXXX. te informa sobre su Política de Privacidad respecto del tratamiento y protección de los datos de
          carácter personal de los usuarios y clientes que puedan ser recabados por la navegación o contratación de
          servicios a través del sitio Web https://orthopedic-spine.com.
        </Paragraph>

        <Paragraph>.....</Paragraph>

        <Title level={4}>Principios aplicados en el tratamiento de datos</Title>
        <Paragraph>
          <Text>
            En el tratamiento de tus datos personales, el Titular aplicará los siguientes principios que se ajustan a
            las exigencias del nuevo reglamento europeo de protección de datos ......
          </Text>
        </Paragraph>

        <Title level={2}>Política de Cookies</Title>
        <Paragraph>
          Para que este sitio Web funcione correctamente necesita utilizar cookies, que es una información que se
          almacena en tu navegador web. En la página Política de Cookies puedes consultar toda la información relativa a
          la política de recogida, la finalidad y el tratamiento de las cookies. .....
        </Paragraph>
      </Typography>
    </>
  );
};

export default PrivacyAndCookiesPolicy;
