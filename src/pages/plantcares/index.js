import Box from '@mui/material/Box';

export const Plantcares = ({}) => {
  return (
    <span data-testid="plantcares">
      <Box sx={{ mt: { xs: 5, sm: 8 } }}>
        <span id="garden"></span>
        <span id="watering"></span>
        <span id="connectivity"></span>
      </Box>
    </span>
  );
};

export default Plantcares;
