import { useMemo } from 'react';
import PropTypes from 'prop-types';
// UI components
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
// Components
import Form from '../form';
import Statics from './statics';
import Main from '../../../themes/main';

export const FormCard = ({ plantcare, onCloseHandler }) => {
  const { styles, props } = useMemo(() => Statics(), []);

  return (
    <ThemeProvider theme={Main}>
      <Card sx={styles.card}>
        <Box data-testid="form" sx={{ position: 'relative' }}>
          <Box sx={styles.cardForm}>
            <Button
              {...props.actionButton}
              data-testid="close-form"
              onClick={() => {
                onCloseHandler();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </Button>
          </Box>
          <Form plantcare={plantcare} />
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default FormCard;

FormCard.propTypes = {
  plantcare: PropTypes.object,
  onCloseHandler: PropTypes.func
};

FormCard.defaultProps = {
  plantcare: {},
  onCloseHandler: () => {}
};
