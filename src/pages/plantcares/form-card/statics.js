export const Statics = () => {
  const styles = {
    card: {
      maxWidth: 325,
      height: 578,
      mt: { xs: 8, sm: 8 },
      margin: '20px'
    },
    cardForm: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '100%',
      height: '100px',
      textAlign: 'right'
    }
  };

  const props = {
    actionButton: {
      color: 'light',
      variant: 'contained',
      size: 'large',
      sx: {
        margin: '0 5px',
        borderRadius: '50%',
        width: '45px',
        minWidth: '45px',
        height: '45px',
        padding: '5px'
      }
    }
  };

  return { styles, props };
};

export default Statics;
