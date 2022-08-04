import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const defaultStyles = {
  mobile: {
    display: { xs: 'flex', lg: 'none' },
    textAlign: { xs: 'center', md: 'left' },
    alignItems: { xs: 'center', md: 'center' },
    padding: '20px 10px 0 10px'
  },
  desktop: { display: { xs: 'none', lg: 'flex' } }
};

export const Panel = ({ id, title, subtitle, description, children, styles }) => {
  return (
    <Grid container direction="row" justifyContent="center" id={id}>
      <Grid
        item
        direction="column"
        justifyContent="center"
        textAlign="center"
        xs={12}
        md={8}
        lg={8}
        xl={8}
        sx={{ ...defaultStyles.desktop, ...styles }}
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
        sm={10}
        md={children ? 5 : 10}
        lg={5}
        direction="column"
        justifyContent="center"
        textAlign="center"
        sx={{ ...defaultStyles.mobile, ...styles }}
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
      {children && (
        <Grid
          item
          xs={12}
          sm={10}
          md={5}
          lg={5}
          direction="column"
          justifyContent="center"
          textAlign="center"
          sx={{ ...defaultStyles.mobile, ...styles }}
        >
          {children}
        </Grid>
      )}
    </Grid>
  );
};

export default Panel;

Panel.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  styles: PropTypes.object
};

Panel.defaultProps = {
  id: Math.random().toString(36).slice(2), //Ramdom alphanumeric value
  subtitle: null,
  description: null,
  children: null,
  styles: {}
};
