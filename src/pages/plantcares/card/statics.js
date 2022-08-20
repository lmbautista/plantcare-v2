import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import enLocale from './locales/en.js';
import Main from '../../../themes/main';

export const Statics = ({ plantcare }) => {
  const styles = {
    card: {
      maxWidth: 325,
      height: 578,
      mt: { xs: 8, sm: 8 },
      margin: '20px'
    },
    cardOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      height: '250px'
    },
    cardOverlayForm: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      width: '100%',
      height: '100px',
      textAlign: 'right'
    },
    cardImage: {
      height: '60px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '10px'
    },
    cardDetails: {
      width: '100%',
      maxWidth: 300,
      textAlign: 'center',
      paddingTop: '0',
      paddingLeft: '15px',
      paddingBottom: '16px'
    },
    colorForWetStatus: (wet) => {
      let color;
      if (wet <= 100) {
        color = '#8CD999';
      }
      if (wet <= 85) {
        color = '#96D98C';
      }
      if (wet <= 75) {
        color = '#ACD6A6';
      }
      if (wet <= 65) {
        color = '#BED6A6';
      }
      if (wet <= 55) {
        color = '#C4D6A6';
      }
      if (wet <= 45) {
        color = '#EBEE55';
      }
      if (wet <= 35) {
        color = '#EEBA55';
      }
      if (wet <= 25) {
        color = '#EE9E55';
      }
      if (wet <= 15) {
        color = '#EE7955';
      }

      return color;
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
    },
    listImage: {
      stroke: Main.palette.secondary.main,
      fill: Main.palette.secondary.main,
      width: '30px',
      height: '30px'
    }
  };

  const wetStatusColor = styles.colorForWetStatus(plantcare.wet);
  const typographies = {
    name: (
      <Typography variant="h4" color="secondary" sx={{ fontWeight: '400' }}>
        {plantcare.name}
      </Typography>
    ),
    watered_at: (
      <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: '300' }}>
        {`${enLocale.watered_at} ${plantcare.watered_at}`}
      </Typography>
    ),
    scheduled_at: (
      <Typography variant="subtitle1" sx={{ fontWeight: '300' }}>
        {`${enLocale.scheduled_at} ${plantcare?.waterings[0]?.programmed_at}`}
      </Typography>
    ),
    planted_at: (
      <Typography variant="subtitle1" sx={{ fontWeight: '300' }}>
        {`${enLocale.planted_at} ${plantcare.planted_at}`}
      </Typography>
    ),
    syncedAt: (
      <Typography variant="subtitle1" sx={{ fontWeight: '300' }}>
        {`${enLocale.syncedAt} ${plantcare.wet_synced_at}`}
      </Typography>
    ),
    wetStatus: (
      <>
        <Typography variant="h4" sx={{ fontWeight: '400', display: 'inline-block' }}>
          <span style={{ color: wetStatusColor }}>{plantcare.wet}%</span>
        </Typography>
        <Typography
          variant="h6"
          color="secondary"
          sx={{ fontWeight: '500', marginTop: '-10px', marginLeft: '5px', display: 'inline-block' }}
        >
          {enLocale.ofWet}
        </Typography>
      </>
    )
  };

  return { styles, props, typographies };
};

export default Statics;

Statics.propTypes = {
  plantcare: PropTypes.object.isRequired
};
