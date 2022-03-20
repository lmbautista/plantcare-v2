import { useState } from 'react';
import defaultImg from './images/plantcare-default.jpeg';
import heartHightImg from './images/heart-hight.png';
import heartMidImg from './images/heart-mid.png';
import heartLowImg from './images/heart-low.png';
import editImg from './images/edit.png';
import removeImg from './images/remove.png';
import scheduleImg from './images/schedule.png';
import wateredAtImg from './images/watered-at.png';
import plantedAtImg from './images/planted-at.png';
import scheduledAtImg from './images/scheduled-at.png';
// UI components
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

export default function PlantcareCard() {
  const wetStatuses = [
    [heartHightImg, Math.min(Math.floor(Math.random() * 100) + 60, 100) + '%'],
    [heartMidImg, Math.floor(Math.random() * 60) + 35 + '%'],
    [heartLowImg, Math.floor(Math.random() * 35) + '%']
  ];
  const wetStatusIdx = Math.floor(Math.random() * 3);
  const wetStatus = (
    <>
      <Typography
        variant="h2"
        color="secondary"
        sx={{ fontWeight: 'light', display: 'inline-block', marginLeft: '5px' }}
      >
        {wetStatuses[wetStatusIdx][1]}
      </Typography>
      <Typography
        variant="h5"
        color="secondary"
        sx={{ fontWeight: 'light', display: 'inline-block', marginLeft: '5px' }}
      >
        of wet
      </Typography>
    </>
  );
  const wateredAt = (
    <>
      <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: 'light' }}>
        Watered at 03/03/2022
      </Typography>
    </>
  );
  const scheduledAt = (
    <>
      <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: 'light' }}>
        Scheduled at 03/03/2022
      </Typography>
    </>
  );
  const plantedAt = (
    <>
      <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: 'light' }}>
        Planted at 03/03/2022
      </Typography>
    </>
  );

  return (
    <Card sx={{ maxWidth: 350, mt: { xs: 8, sm: 8 }, ml: 'auto', mr: 'auto' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia component="img" height="300" image={defaultImg} alt="Plant" />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '300px',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            color: 'white'
          }}
        >
          <Box
            sx={{
              height: '60px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '10px'
            }}
          >
            <Avatar src={editImg} sx={{ margin: '0 5px' }} />
            <Avatar src={scheduleImg} sx={{ margin: '0 5px' }} />
            <Avatar src={removeImg} sx={{ margin: '0 5px' }} />
          </Box>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'start',
              textAlign: 'center',
              paddingTop: '20px'
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 'light' }}>
              Ficus retusa
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'light' }}>
              Whatever description text
            </Typography>
          </Box>
        </Box>
        <CardContent>
          <List
            sx={{
              width: '100%',
              maxWidth: 350,
              textAlign: 'center',
              paddingLeft: '20px',
              paddingTop: '0',
              paddingBottom: '0'
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  src={wetStatuses[wetStatusIdx][0]}
                  sx={{ margin: 'auto', width: 65, height: 65 }}
                />
              </ListItemAvatar>
              <ListItemText primary={wetStatus} />
            </ListItem>
            <ListItem sx={{ paddingTop: '4px', paddingBottom: '4px' }}>
              <ListItemAvatar>
                <Avatar src={wateredAtImg} sx={{ margin: 'auto' }} />
              </ListItemAvatar>
              <ListItemText primary={wateredAt} />
            </ListItem>
            <ListItem sx={{ paddingTop: '4px', paddingBottom: '4px' }}>
              <ListItemAvatar>
                <Avatar src={scheduledAtImg} sx={{ margin: 'auto' }} />
              </ListItemAvatar>
              <ListItemText primary={scheduledAt} />
            </ListItem>
            <ListItem sx={{ paddingTop: '4px', paddingBottom: '4px' }}>
              <ListItemAvatar>
                <Avatar src={plantedAtImg} sx={{ margin: 'auto' }} />
              </ListItemAvatar>
              <ListItemText primary={plantedAt} />
            </ListItem>
          </List>
        </CardContent>
      </Box>
    </Card>
  );
}
