import { Link } from 'react-router-dom';
import gardenImg from './images/garden.png';
// UI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// Components
import Card from './card';
import PanelWithImage from '../../components/panel-with-image';
// Others
import enLocale from './locales/en.js';

const styles = {
  minHeight: '95vmin',
  display: 'flex',
  alignItems: 'center'
};

const gardenStyles = { background: 'rgb(16, 122, 121, 0.02)' };

const wateringStyles = {
  background:
    '-webkit-linear-gradient(50deg, #5878BE  30%, rgba(0,0,0,0) 30%), -webkit-linear-gradient(30deg, #FCFCFC 60%, #3F5588 60%)',
  background:
    '-o-linear-gradient(50deg, #5878BE  30%, rgba(0,0,0,0) 30%), -o-linear-gradient(30deg, #FCFCFC 60%, #3F5588 60%)',
  background:
    '-moz-linear-gradient(50deg, #5878BE  30%, rgba(0,0,0,0) 30%), -moz-linear-gradient(30deg, #FCFCFC 60%, #3F5588 60%)',
  background:
    'linear-gradient(50deg, #5878BE  30%, rgba(0,0,0,0) 30%), linear-gradient(30deg, #FCFCFC 60%, #3F5588 60%)'
};

const connectivityStyles = {
  background:
    '-webkit-linear-gradient(80deg, #FED8A3  20%, rgba(0,0,0,0) 20%), -webkit-linear-gradient(35deg, #FCFCFC 60%, #FFE8C8 60%)',
  background:
    '-o-linear-gradient(80deg, #FED8A3  20%, rgba(0,0,0,0) 20%), -o-linear-gradient(35deg, #FCFCFC 60%, #FFE8C8 60%)',
  background:
    '-moz-linear-gradient(80deg, #FED8A3  20%, rgba(0,0,0,0) 20%), -moz-linear-gradient(35deg, #FCFCFC 60%, #FFE8C8 60%)',
  background:
    'linear-gradient(80deg, #FED8A3  20%, rgba(0,0,0,0) 20%), linear-gradient(35deg, #FCFCFC 60%, #FFE8C8 60%)'
};

export const Plantcares = ({}) => {
  const gardenButtons = (
    <Stack direction="row" spacing={2} pt={6}>
      <Button component={Link} to="#" variant="outlined" color="primary" size="large">
        {enLocale.theGarden.new}
      </Button>
      <Button component={Link} to="#" variant="outlined" color="primary" size="large">
        {enLocale.theGarden.howTo}
      </Button>
    </Stack>
  );

  return (
    <span data-testid="plantcares">
      <div id="garden" style={{ ...styles, ...gardenStyles }}>
        <Box sx={{ mt: { xs: 5, sm: 8 }, padding: '30px', width: '100%' }}>
          <Grid
            container
            sx={{ margin: 'auto' }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            maxWidth="xl"
          >
            <Grid item direction="column" justifyContent="center" xs={12}>
              <PanelWithImage
                image={gardenImg}
                styles={{ imgStyles: { maxHeight: '35vh' }, minHeight: '1vmin' }}
                title={enLocale.theGarden.title}
                subtitle={enLocale.theGarden.subtitle}
                description={enLocale.theGarden.description}
                children={gardenButtons}
              />
            </Grid>
            <Grid
              item
              direction="column"
              justifyContent="center"
              xs={12}
              sm={6}
              md={6}
              lg={3}
              xl={3}
            >
              <Card />
            </Grid>
            <Grid
              item
              direction="column"
              justifyContent="center"
              xs={12}
              sm={6}
              md={6}
              lg={3}
              xl={3}
            >
              <Card />
            </Grid>
            <Grid
              item
              direction="column"
              justifyContent="center"
              xs={12}
              sm={6}
              md={6}
              lg={3}
              xl={3}
            >
              <Card />
            </Grid>
            <Grid
              item
              direction="column"
              justifyContent="center"
              xs={12}
              sm={6}
              md={6}
              lg={3}
              xl={3}
            >
              <Card />
            </Grid>
          </Grid>
        </Box>
      </div>
      <span id="watering" style={{ ...styles, ...wateringStyles }}>
        <Container maxWidth="xl">
          <Grid container direction="row" justifyContent="center" alignItems="stretch">
            <Grid item xs={12} pb="40px" pt="20px">
              <Typography fontFamily={'Pacifico'} color="secondary" variant="h2">
                The watering
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </span>
      <span id="connectivity" style={{ ...styles, ...connectivityStyles }}>
        <Container maxWidth="xl">
          <Grid container direction="row" justifyContent="center" alignItems="stretch">
            <Grid item xs={12} pb="40px" pt="20px">
              <Typography fontFamily={'Pacifico'} color="secondary" variant="h2">
                The connectivity
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </span>
    </span>
  );
};

export default Plantcares;
