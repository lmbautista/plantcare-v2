import { useMemo } from 'react';
import PropTypes from 'prop-types';
// UI components
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// Others
import Main from '../../../themes/main';

const BUBBLE_HEIGHT = 280;
const BUBBLE_IMG_HEIGHT = 90;

export const BubbleCard = ({ id, title, subtitle, icon, background, actions }) => {
  const styles = useMemo(
    () => ({
      card: {
        background: 'transparent',
        boxShadow: 'none',
        maxWidth: BUBBLE_HEIGHT,
        mt: { xs: 8, sm: 8 },
        margin: '20px'
      },
      cardImageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: BUBBLE_HEIGHT,
        borderRadius: '100%',
        background: 'rgba(0, 0, 0, 0.6)'
      },
      cardIcon: {
        height: BUBBLE_IMG_HEIGHT,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'left',
        justifyContent: 'left',
        padding: '0 0 15px'
      },
      cardActions: {
        height: '80px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px'
      },
      cardDetails: {
        width: '100%',
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 'auto',
        color: '#FFF'
      }
    }),
    []
  );

  return (
    <ThemeProvider theme={Main}>
      <Card id={id} sx={styles.card}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height={BUBBLE_HEIGHT}
            image={background}
            sx={{ borderRadius: '100%' }}
            data-testid="background"
          />
          <Box sx={styles.cardImageOverlay}>
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
              <Box sx={styles.cardIcon}>
                <img src={icon} height={BUBBLE_IMG_HEIGHT} data-testid="icon" />
              </Box>
              <Box sx={styles.cardActions} data-testid="actions">
                {actions}
              </Box>
            </Box>
            <Box sx={styles.cardDetails}>
              <Typography variant="h5" color="light" sx={{ fontWeight: '400' }}>
                {title}
              </Typography>
              <Typography variant="subtitle1" color="light" sx={{ fontWeight: '300' }}>
                {subtitle}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default BubbleCard;

BubbleCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  icon: PropTypes.node,
  background: PropTypes.node.isRequired,
  actions: PropTypes.node
};

BubbleCard.defautProps = {
  id: Math.random().toString(36).slice(2), //Ramdom alphanumeric value
  subtitle: null,
  icon: <></>,
  actions: <></>
};
