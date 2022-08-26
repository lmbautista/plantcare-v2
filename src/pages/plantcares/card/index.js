import { useMemo } from 'react';
import PropTypes from 'prop-types';
// UI components
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
// Components
import defaultImg from './images/plantcare-default.png';
import { ReactComponent as HeartImg } from './images/heart-icon.svg';
import { ReactComponent as EditImg } from './images/edit-icon.svg';
import { ReactComponent as RemoveImg } from './images/remove-icon.svg';
import { ReactComponent as ScheduleImg } from './images/schedule-icon.svg';
import { ReactComponent as WateredAtImg } from './images/watered-at-icon.svg';
import { ReactComponent as PlantedAtImg } from './images/planted-at-icon.svg';
import { ReactComponent as ScheduledAtImg } from './images/scheduled-at-icon.svg';
import { ReactComponent as WifiImg } from './images/wifi-icon.svg';
// Others
import Statics from './statics';
import Main from '../../../themes/main';

export const PlantcareCard = ({ plantcare, onEditHandler, onRemoveHandler }) => {
  const { styles, props, typographies } = useMemo(() => Statics({ plantcare }), [plantcare]);
  const wetStatusColor = styles.colorForWetStatus(plantcare.wet);

  return (
    <ThemeProvider theme={Main}>
      <Card sx={styles.card}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia component="img" height="250" image={defaultImg} alt="Plant" />
          <Box sx={styles.cardOverlay}>
            <Box sx={styles.cardImage} data-testid="actions">
              <Button
                {...props.actionButton}
                data-testid="edit-button"
                onClick={() => {
                  onEditHandler();
                }}
              >
                <EditImg width="45px" height="45px" />
              </Button>
              <Button {...props.actionButton}>
                <ScheduleImg width="45px" height="45px" />
              </Button>
              <Button {...props.actionButton} data-testid="remove-button" onClick={onRemoveHandler}>
                <RemoveImg width="45px" height="45px" />
              </Button>
            </Box>
          </Box>
          <CardContent sx={{ padding: '20px 16px' }}>
            <List sx={styles.cardDetails} data-testid="details">
              <ListItem sx={{ padding: '0 13px 4px' }}>
                <ListItemAvatar sx={{ minWidth: 'auto' }}>
                  <WifiImg stroke="#1A2A48" fill="#1A2A48" width="30px" height="30px" />
                </ListItemAvatar>
                <ListItemText primary={typographies.syncedAt} />
              </ListItem>
              <ListItem sx={{ paddingTop: '4px', paddingBottom: '0' }}>
                {typographies.name}
              </ListItem>
              <ListItem sx={{ paddingTop: '0', paddingBottom: '15px' }} data-testid="wetstatus">
                <ListItemAvatar sx={{ minWidth: 'auto' }}>
                  <HeartImg
                    stroke={`${wetStatusColor}`}
                    fill={`${wetStatusColor}`}
                    width="55px"
                    height="55px"
                    style={{ paddingRight: '5px' }}
                  />
                </ListItemAvatar>
                <ListItemText color="secondary" primary={typographies.wetStatus} />
              </ListItem>
              {plantcare.planted_at && (
                <ListItem sx={{ padding: '0 13px' }}>
                  <ListItemAvatar sx={{ minWidth: 'auto' }}>
                    <PlantedAtImg {...props.listImage} />
                  </ListItemAvatar>
                  <ListItemText primary={typographies.planted_at} />
                </ListItem>
              )}
              {plantcare.watered_at && (
                <ListItem sx={{ padding: '0 13px' }}>
                  <ListItemAvatar sx={{ minWidth: 'auto' }}>
                    <WateredAtImg {...props.listImage} />
                  </ListItemAvatar>
                  <ListItemText primary={typographies.watered_at} />
                </ListItem>
              )}
              {plantcare.waterings?.[0] && (
                <ListItem sx={{ padding: '0 13px' }}>
                  <ListItemAvatar sx={{ minWidth: 'auto' }}>
                    <ScheduledAtImg {...props.listImage} />
                  </ListItemAvatar>
                  <ListItemText primary={typographies.scheduled_at} />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default PlantcareCard;

PlantcareCard.propTypes = {
  plantcare: PropTypes.object.isRequired,
  onEditHandler: PropTypes.func,
  onRemoveHandler: PropTypes.func
};

PlantcareCard.defaultProps = {
  onEditHandler: () => {},
  onRemoveHandler: () => {}
};
