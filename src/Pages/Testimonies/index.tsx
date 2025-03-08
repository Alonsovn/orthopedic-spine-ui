import { PlusCircleFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Form, Input, Layout, Modal, Rate, Row, Space, Typography } from 'antd';
import { motion } from 'framer-motion';
import { testimoniesMockData } from '../../Resources/MockData/testimonies';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setTestimonies } from '../../Redux/Slices/testimoniesSlice';
import { useGetTestimonialsQuery } from '../../Api/orthopedicSpineApi';
const { Title, Paragraph } = Typography;
const { Content } = Layout;

export interface Testimony {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  comment: string;
}

const Testimonies: React.FC = () => {
  const dispatch = useDispatch();

  const testimonies = useSelector((state: RootState) => state.testimonies.testimonies);
  const [showModalAddTestimony, setShowModalAddTestimony] = useState(false);
  const [form] = Form.useForm();

  const { data: testimonialsData } = useGetTestimonialsQuery({});

  useEffect(() => {
    if (testimonialsData) {
      dispatch(setTestimonies(testimonialsData));
    } else {
      dispatch(setTestimonies(testimoniesMockData));
    }
  }, [testimonialsData, dispatch]);

  const handleShowModal = () => {
    setShowModalAddTestimony(true);
  };

  const cancelShowModal = () => {
    setShowModalAddTestimony(false);
  };

  const handleAddTestimony = (values: { firstName: string; lastName: string; rating: number; comment: string }) => {
    const newTestimony: Testimony = {
      id: testimonies.length + 1,
      firstName: values.firstName,
      lastName: values.lastName,
      rating: values.rating,
      comment: values.comment,
    };
    dispatch(setTestimonies([...testimonies, newTestimony]));
    cancelShowModal();
    form.resetFields();
  };

  return (
    <>
      <Title level={1}>Dicen de nostros...</Title>
      <Content style={{ padding: 20 }}>
        <Row gutter={[16, 16]} justify="center">
          {testimonies.map((testimony) => (
            <Col key={testimony.id} xs={24} sm={12} md={8} lg={8}>
              <motion.div
                key={testimony.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  style={{ margin: 16 }}
                  cover={<Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />}
                >
                  <Title level={4}>
                    {testimony.firstName} {testimony.lastName}
                  </Title>
                  <Rate disabled value={testimony.rating} />
                  <Paragraph> {testimony.comment}</Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Content>
      <Row justify="end">
        <Button type="primary" shape="circle" size="large" onClick={handleShowModal}>
          <PlusCircleFilled />
        </Button>
      </Row>
      <Modal title="Agregar nuevo testimonio" open={showModalAddTestimony} onCancel={cancelShowModal} footer={null}>
        <Form form={form} onFinish={handleAddTestimony}>
          <Form.Item
            label="Nombre"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su nombre',
              },
            ]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>
          <Form.Item
            label="Apellido"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su apellido',
              },
            ]}
          >
            <Input placeholder="Apellido" />
          </Form.Item>
          <Form.Item
            label="Calificación"
            name="rating"
            rules={[
              {
                required: true,
                message: 'Por favor seleccione una calificación',
              },
            ]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            label="Opinión"
            name="opinion"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su opinión',
              },
            ]}
          >
            <Input.TextArea placeholder="Opinión" rows={4} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Space>
              <Button type="default" onClick={cancelShowModal} style={{ marginRight: 10 }}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Enviar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Testimonies;
