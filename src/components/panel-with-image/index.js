import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const defaultStyles = {
  mobile: {
    display: { xs: 'flex', lg: 'none' },
    textAlign: { xs: 'center', md: 'left' },
    alignItems: { xs: 'center', md: 'flex-start' },
    padding: '20px 10px 0 10px'
  },
  desktop: { display: { xs: 'none', lg: 'flex' }, minHeight: '93vmin' }
};

const defaultImgStyles = {
  maxWidth: '100%',
  maxHeight: '90vh'
};

export const PanelWithImage = ({ id, image, title, subtitle, description, children, styles }) => {
  const { imgStyles, ...otherStyles } = styles;

  return (
    <Grid container direction="row" justifyContent="space-between" id={id}>
      <Grid
        item
        direction="column"
        justifyContent="center"
        xs={12}
        md={4}
        lg={5}
        sx={{ ...defaultStyles.desktop, ...otherStyles }}
      >
        <Typography fontFamily={'Pacifico'} color="secondary" variant="h1" mb="18px">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            {subtitle}
          </Typography>
        )}
        {description && (
          <Typography variant="h5" pt="20px" sx={{ fontWeight: 'light' }}>
            {description}
          </Typography>
        )}
        {children}
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        lg={5}
        direction="column"
        justifyContent="center"
        textAlign="center"
        sx={{ ...defaultStyles.mobile, ...otherStyles }}
      >
        <Typography fontFamily={'Pacifico'} color="secondary" variant="h2" mb="12px">
          {title}
        </Typography>
        {subtitle && (
          <Typography color="secondary" variant="h4" sx={{ fontWeight: 'bold' }}>
            {subtitle}
          </Typography>
        )}
        {description && (
          <Typography
            variant="h6"
            pt="20px"
            pb="20px"
            sx={{ fontWeight: 'light', lineHeight: '1.2' }}
          >
            {description}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} md={6} lg={5} display="flex" justifyContent="center" alignItems="center">
        <img src={image} alt="panel-image" style={{ ...defaultImgStyles, ...imgStyles }} />
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        lg={5}
        direction="column"
        justifyContent="center"
        textAlign="center"
        sx={{ ...defaultStyles.mobile, ...styles }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default PanelWithImage;

PanelWithImage.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  styles: PropTypes.object
};

PanelWithImage.defaultProps = {
  id: Math.random().toString(36).slice(2), //Ramdom alphanumeric value
  subtitle: null,
  description: null,
  children: <></>,
  styles: {}
};
