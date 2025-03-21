import { PlusCircleFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Form, Input, Layout, message, Modal, Rate, Row, Space, Typography } from 'antd';
import { motion } from 'framer-motion';
import { testimonialsMockData } from '../../Resources/MockData/testimonials';
import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setTestimonials } from '../../Redux/Slices/testimonialSlice';
import { useCreateTestimonialMutation, useGetTestimonialsQuery } from '../../Api/orthopedicSpineApi';
const { Title, Paragraph } = Typography;
const { Content } = Layout;

export interface Testimonial {
  firstName: string;
  lastName: string;
  rating: number;
  comment: string;
}

const Testimonials: React.FC = () => {
  const dispatch = useDispatch();

  const testimonials = useSelector((state: RootState) => state.testimonial.testimonials);
  const [showModalAddTestimonial, setShowModalAddTestimonial] = useState(false);
  const [form] = Form.useForm();

  const { loggedIn } = useSelector(
    (state: RootState) => ({
      loggedIn: state.user.loggedIn,
    }),
    shallowEqual,
  );

  const { data: testimonialsData } = useGetTestimonialsQuery({});
  const [createTestimonial] = useCreateTestimonialMutation();

  useEffect(() => {
    if (testimonialsData && testimonialsData?.length > 0) {
      dispatch(setTestimonials(testimonialsData));
    } else {
      dispatch(setTestimonials(testimonialsMockData));
    }
  }, [testimonialsData, dispatch]);

  const handleShowModal = () => {
    setShowModalAddTestimonial(true);
  };

  const cancelShowModal = () => {
    setShowModalAddTestimonial(false);
  };

  const handleAddTestimonial = useCallback(
    async (values: { firstName: string; lastName: string; rating: number; comment: string }) => {
      try {
        const newTestimonial: Testimonial = {
          firstName: values.firstName,
          lastName: values.lastName,
          rating: values.rating,
          comment: values.comment,
        };
        const response = await createTestimonial(newTestimonial).unwrap();
        if (response.error) {
          message.error('Error al agregar un testimonio. Inténtelo de nuevo.');
          return;
        }

        message.success('Testimonio agregado con éxito!');
        cancelShowModal();
        form.resetFields();
      } catch {
        message.error('Error al agregar el testimonio');
      }
    },
    [createTestimonial, form],
  );

  return (
    <>
      <Title level={1}>Dicen de nostros...</Title>
      <Content style={{ padding: 20 }}>
        <Row gutter={[16, 16]} justify="center">
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} xs={24} sm={12} md={8} lg={8}>
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  style={{ margin: 16 }}
                  cover={<Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />}
                >
                  <Title level={4}>
                    {testimonial.firstName} {testimonial.lastName}
                  </Title>
                  <Rate disabled value={testimonial.rating} />
                  <Paragraph> {testimonial.comment}</Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Content>

      {!!loggedIn && (
        <Row justify="end">
          <Button type="primary" shape="circle" size="large" onClick={handleShowModal}>
            <PlusCircleFilled />
          </Button>
        </Row>
      )}

      <Modal title="Agregar nuevo testimonio" open={showModalAddTestimonial} onCancel={cancelShowModal} footer={null}>
        <Form form={form} onFinish={handleAddTestimonial}>
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
            label="Comentario"
            name="comment"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su comentario',
              },
            ]}
          >
            <Input.TextArea placeholder="Comentario" rows={4} />
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

export default Testimonials;
