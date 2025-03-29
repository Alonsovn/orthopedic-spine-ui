export const useLogoStyle = () => ({
  width: 80,
  height: 60,
  paddingInline: 5,
  marginTop: 10,
  borderRadius: 30,
  cursor: 'pointer',
});

export const useDividerStyle = () => ({
  borderColor: 'white',
  margin: '12 0',
});

export const useHeaderStyle = (colorBgContainer: string) => ({
  padding: '0 20px',
  background: colorBgContainer,
  display: 'flex',
  alignItems: 'center',
});

export const useCollapsedButtonStyle = (isMobile: boolean) => ({
  fontSize: '16px',
  width: 64,
  height: 64,
  display: isMobile ? 'none' : 'block',
});

export const formStyle = {
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  padding: '24px',
  backgroundColor: '#ffffff',
};

export const inputStyle = {
  borderRadius: '8px',
  height: '40px',
};

export const buttonStyle = {
  height: '40px',
  borderRadius: '8px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease-in-out',
};
