export const useLogoStyle = () => ({
  width: 80,
  height: 60,
  paddingInline: 5,
  marginTop: 10,
  borderRadius: 30,
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
