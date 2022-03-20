import gardenImg from './images/garden.png';
// UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// Components
import Card from './card';
import PanelWithImage from '../../components/panel-with-image';

const styles = {
  minHeight: '95vmin',
  display: 'flex',
  alignItems: 'center',
  padding: '40px 0'
};

const gardenStyles = { background: '#fafafa' };

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
  return (
    <span data-testid="plantcares">
      <Box sx={{ mt: { xs: 8, sm: 8.5 } }}>
        <div id="garden" style={{ ...styles, ...gardenStyles }}>
          <Container maxWidth="xl">
            <PanelWithImage
              image={gardenImg}
              imageSize={'60%'}
              title="The garden"
              subtitle="Take care of your plants remotely"
              description="Here you could manage each plantcare connected to the board: configure the soil moisture sensors, the waterpumps, check the watering status, schedule a seasonal watering and much more"
              styles={{ minHeight: 'auto', imgStyles: { maxHeight: '50vh' } }}
            />
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              alignItems="stretch"
            >
              <Grid item direction="column" justifyContent="center" xs={12} sm={12} md={6} lg={3}>
                <Card />
              </Grid>
              <Grid item direction="column" justifyContent="center" xs={12} sm={12} md={6} lg={3}>
                <Card />
              </Grid>
              <Grid item direction="column" justifyContent="center" xs={12} sm={12} md={6} lg={3}>
                <Card />
              </Grid>
              <Grid item direction="column" justifyContent="center" xs={12} sm={12} md={6} lg={3}>
                <Card />
              </Grid>
            </Grid>
          </Container>
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
      </Box>
    </span>
  );
};

export default Plantcares;
