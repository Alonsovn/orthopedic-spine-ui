import { DeleteFilled, PlusCircleFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Form, Input, Layout, message, Modal, Rate, Row, Space, Typography } from 'antd';
import { motion } from 'framer-motion';
import { testimonialsMockData } from '../../Resources/MockData/testimonials';
import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import {
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
} from '../../Api/orthopedicSpineApi';
import { buttonStyle } from '../../Style';
const { Title, Paragraph } = Typography;
const { Content } = Layout;

export interface Testimonial {
  id: string;
  firstName: string;
  lastName: string;
  rating: number;
  comment: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  useEffect(() => {
    if (testimonialsData && testimonialsData?.length > 0) {
      setTestimonials(testimonialsData);
    } else setTestimonials(testimonialsMockData);
  }, [testimonialsData]);

  const handleShowModal = () => {
    setShowModalAddTestimonial(true);
  };

  const cancelShowModal = () => {
    setShowModalAddTestimonial(false);
  };

  const handleAddTestimonial = useCallback(
    async (newTestimonial: Testimonial) => {
      try {
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

  const handleDeleteTestimonial = async (testimonialId: string) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este testimonio?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      async onOk() {
        try {
          await deleteTestimonial(testimonialId).unwrap();
          message.success('Testimonio eliminado con éxito!');
        } catch (error) {
          console.error('Error al eliminar testimonio:', error);
          message.error('No se pudo eliminar el testimonio. Inténtalo de nuevo.');
        }
      },
    });
  };

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
                  {...(!!loggedIn && {
                    actions: [
                      <Button
                        type="text"
                        icon={<DeleteFilled />}
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                      />,
                    ],
                  })}
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

      <Modal
        title="Agregar nuevo testimonio"
        open={showModalAddTestimonial}
        onCancel={cancelShowModal}
        footer={null}
        destroyOnClose
      >
        <Form form={form} onFinish={handleAddTestimonial} layout="vertical">
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
            <Input placeholder="Nombre" autoFocus />
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
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Space>
                <Button onClick={cancelShowModal} style={buttonStyle}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit" style={buttonStyle}>
                  Enviar
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Testimonials;
