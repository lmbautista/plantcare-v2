import { useMemo } from 'react';
// UI components
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
import enLocale from './locales/en.js';
import Main from '../../../themes/main';

export default function PlantcareCard() {
  const styles = useMemo(
    () => ({
      wetStatusColor: (wet) => {
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
      },
      cardImageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '250px',
        bgcolor: 'rgba(0, 0, 0, 0.05)',
        color: 'white'
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
        paddingLeft: '0',
        paddingBottom: '16px'
      }
    }),
    []
  );

  const props = useMemo(
    () => ({
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
    }),
    []
  );

  // Mocks BEGIN
  const wetStatuses = useMemo(
    () => [
      Math.min(Math.floor(Math.random() * 100) + 60, 100),
      Math.floor(Math.random() * 60) + 35,
      Math.floor(Math.random() * 35)
    ],
    []
  );
  const names = useMemo(() => ['Ficus retusa', 'Lemon cypress', 'Olive tree', 'Elm zelkova'], []);
  const mockIdx = Math.floor(Math.random() * 3);
  const plantcare = {
    name: names[mockIdx],
    wet: wetStatuses[mockIdx],
    plantedAt: '03/03/2022',
    wateredAt: '03/03/2022 15:35',
    scheduledAt: '03/03/2022 21:22'
  };
  // Mocks END
  const wetStatusColor = styles.wetStatusColor(wetStatuses[mockIdx]);
  const typographies = {
    wateredAt: (
      <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: '300' }}>
        {`${enLocale.wateredAt} ${plantcare.wateredAt}`}
      </Typography>
    ),
    scheduledAt: (
      <Typography variant="subtitle1" sx={{ fontWeight: '300' }}>
        {`${enLocale.scheduledAt} ${plantcare.scheduledAt}`}
      </Typography>
    ),
    plantedAt: (
      <Typography variant="subtitle1" sx={{ fontWeight: '300' }}>
        {`${enLocale.plantedAt} ${plantcare.plantedAt}`}
      </Typography>
    ),
    syncedAt: (
      <Typography variant="subtitle1" sx={{ fontWeight: '300' }}>
        {`${enLocale.syncedAt} 03/03/2022 15:35`}
      </Typography>
    ),
    wetStatus: (
      <>
        <Typography variant="h3" sx={{ fontWeight: '400', display: 'inline-block' }}>
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

  return (
    <ThemeProvider theme={Main}>
      <Card sx={{ maxWidth: 345, mt: { xs: 8, sm: 8 }, ml: 'auto', mr: 'auto' }}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia component="img" height="250" image={defaultImg} alt="Plant" />
          <Box sx={styles.cardImageOverlay}>
            <Box sx={styles.cardImage}>
              <Button {...props.actionButton}>
                <EditImg width="45px" height="45px" />
              </Button>
              <Button {...props.actionButton}>
                <ScheduleImg width="45px" height="45px" />
              </Button>
              <Button {...props.actionButton}>
                <RemoveImg width="45px" height="45px" />
              </Button>
            </Box>
          </Box>
          <CardContent sx={{ pt: 5, pb: 5, pr: 3, pl: 3 }}>
            <List sx={styles.cardDetails}>
              <ListItem sx={{ padding: '0 13px 4px' }}>
                <ListItemAvatar sx={{ minWidth: 'auto' }}>
                  <WifiImg stroke="#1A2A48" fill="#1A2A48" width="30px" height="30px" />
                </ListItemAvatar>
                <ListItemText primary={typographies.syncedAt} />
              </ListItem>
              <ListItem sx={{ paddingTop: '4px', paddingBottom: '0' }}>
                <Typography variant="h4" color="secondary" sx={{ fontWeight: '400' }}>
                  {plantcare.name}
                </Typography>
              </ListItem>
              <ListItem sx={{ paddingTop: '0', paddingBottom: '15px' }}>
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
              <ListItem sx={{ padding: '0 13px' }}>
                <ListItemAvatar sx={{ minWidth: 'auto' }}>
                  <PlantedAtImg {...props.listImage} />
                </ListItemAvatar>
                <ListItemText primary={typographies.plantedAt} />
              </ListItem>
              <ListItem sx={{ padding: '0 13px' }}>
                <ListItemAvatar sx={{ minWidth: 'auto' }}>
                  <WateredAtImg {...props.listImage} />
                </ListItemAvatar>
                <ListItemText primary={typographies.wateredAt} />
              </ListItem>
              <ListItem sx={{ padding: '0 13px' }}>
                <ListItemAvatar sx={{ minWidth: 'auto' }}>
                  <ScheduledAtImg {...props.listImage} />
                </ListItemAvatar>
                <ListItemText primary={typographies.scheduledAt} />
              </ListItem>
            </List>
          </CardContent>
        </Box>
      </Card>
    </ThemeProvider>
  );
}
