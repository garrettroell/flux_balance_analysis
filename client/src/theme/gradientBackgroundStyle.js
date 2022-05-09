const gradientBackgroundStyle = colorMode => {
  if (colorMode === 'light') {
    return {
      w: '100vw',
      minHeight: '100vh',
      backgroundAttachment: 'fixed',
      bgGradient: 'linear(to-b, white, white)',
    };
  } else {
    return {
      w: '100vw',
      minHeight: '100vh',
      backgroundAttachment: 'fixed',
      bgGradient: 'linear(to-b, gray.800, purple.900)',
    };
  }
};

export default gradientBackgroundStyle;
