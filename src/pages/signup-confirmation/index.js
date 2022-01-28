import conffettiImg from './images/conffetti.png';
import signupConfirmationImg from './images/signup-confirmation.png';
// UI components
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
// Components
import PanelWithImage from '../../components/panel-with-image';
// Others
import enLocale from './locales/en.js';
import Main from '../../themes/main';

export const SignupConfirmation = ({}) => {
  return (
    <ThemeProvider theme={Main}>
      <Box
        sx={{
          mt: { xs: 5, sm: 8 },
          backgroundImage: `url(${conffettiImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'color',
          mixBlendMode: 'darken'
        }}
      >
        <PanelWithImage
          image={signupConfirmationImg}
          title={enLocale.title}
          subtitle={enLocale.subtitle}
          description={enLocale.description}
          styles={{ textAlign: 'center' }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default SignupConfirmation;
