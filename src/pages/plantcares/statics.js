import enLocale from './locales/en.js';
import Main from '../../themes/main';
//  Components
import Typography from '@mui/material/Typography';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const HEADER_HEIGHT = 64;

export const Statics = () => {
  const styles = {
    default: {
      minHeight: '95vmin',
      display: 'flex',
      alignItems: 'center'
    },
    gardenStyles: { background: '#F6F3F3' },
    wateringStyles: { background: '#F3F5F6' },
    connectivityStyles: { background: '#F6F5F3' },
    howToStyles: { background: '#DADFDF' },
    notFound: {
      text: {
        display: 'flex',
        alignItems: { xs: 'center', sm: 'start' },
        justifyContent: 'center'
      }
    },
    theGarden: {
      imgContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'end' },
        maxHeight: { xs: '48vh', sm: '28vh' },
        paddingRight: { xs: '0', sm: '60px' },
        marginBottom: { xs: '30px' },
        marginTop: { xs: '30px', sm: 0 }
      },
      img: { maxHeight: '28vh', maxWidth: '100%' },
      details: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: { xs: '30px 10px 0', sm: '0 10px' },
        textAlign: { xs: 'center', sm: 'inherit' }
      }
    },
    theWatering: {
      imgContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'end' },
        maxHeight: { xs: '48vh', sm: '28vh' },
        paddingRight: { xs: '0', sm: '60px' },
        marginBottom: { xs: '30px' },
        marginTop: { xs: '30px', sm: 0 }
      },
      img: { maxHeight: '28vh', maxWidth: '100%' },
      details: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: { xs: '30px 10px 0', sm: '0 10px' },
        textAlign: { xs: 'center', sm: 'inherit' }
      }
    },
    theConnectivity: {
      imgContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'end' },
        maxHeight: { xs: '48vh', sm: '28vh' },
        paddingRight: { xs: '0', sm: '60px' },
        marginBottom: { xs: '30px' },
        marginTop: { xs: '30px', sm: 0 }
      },
      img: { maxHeight: '28vh', maxWidth: '100%' },
      details: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: { xs: '30px 10px 0', sm: '0 10px' },
        textAlign: { xs: 'center', sm: 'inherit' }
      }
    },
    theInstructions: {
      howSetup: {
        img: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'end' },
          maxHeight: { xs: '50vmin', sm: '22vmin' },
          paddingRight: { xs: '0', sm: '30px' },
          marginBottom: { xs: '30px' }
        }
      },
      howItworks: {
        img: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '60vh',
          margin: 'auto'
        },
        avatar: {
          background: '#F4F4F4',
          color: Main.palette.secondary.main,
          border: `1px solid ${Main.palette.secondary.main}`
        }
      }
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
    }
  };
  const typographies = {
    theGarden: {
      title: (
        <Typography fontFamily={'Pacifico'} color="secondary" variant="h2" mb="18px">
          {enLocale.theGarden.title}
        </Typography>
      ),
      subtitle: (
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {enLocale.theGarden.subtitle}
        </Typography>
      ),
      description: (
        <Typography variant="h6" pt="20px" sx={{ fontWeight: 'light' }}>
          {enLocale.theGarden.description}
        </Typography>
      )
    },
    theWatering: {
      title: (
        <Typography fontFamily={'Pacifico'} color="secondary" variant="h2" mb="18px">
          {enLocale.theWatering.title}
        </Typography>
      ),
      subtitle: (
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {enLocale.theWatering.subtitle}
        </Typography>
      ),
      description: (
        <Typography variant="h6" pt="20px" sx={{ fontWeight: 'light' }}>
          {enLocale.theWatering.description}
        </Typography>
      )
    },
    theConnectivity: {
      title: (
        <Typography fontFamily={'Pacifico'} color="secondary" variant="h2" mb="18px">
          {enLocale.theConnectivity.title}
        </Typography>
      ),
      subtitle: (
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {enLocale.theConnectivity.subtitle}
        </Typography>
      ),
      description: (
        <Typography variant="h6" pt="20px" sx={{ fontWeight: 'light' }}>
          {enLocale.theConnectivity.description}
        </Typography>
      )
    },
    howItWorks: {
      explanaitionOne: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.one.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.one.description}
          </Typography>
        </>
      ),
      explanaitionTwo: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.two.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.two.description}
          </Typography>
        </>
      ),
      explanaitionThree: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.three.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.three.description}
          </Typography>
        </>
      ),
      explanaitionFour: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.four.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.four.description}
          </Typography>
        </>
      ),
      explanaitionFive: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.five.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.five.description}
          </Typography>
        </>
      ),
      explanaitionSix: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.six.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.six.description}
          </Typography>
        </>
      ),
      explanaitionSeven: (
        <>
          <Typography variant="h6" sx={{ fontWeight: '500', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.seven.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: '300', lineHeight: '1.1' }}>
            {enLocale.theInstructions.howItworks.explanaitions.seven.description}
          </Typography>
        </>
      )
    },
    howSetup: {
      stepOne: {
        title: (
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {enLocale.theInstructions.howSetup.stepOne.title}
          </Typography>
        ),
        explanaition: (
          <Typography variant="h6" sx={{ fontWeight: 'light' }}>
            {enLocale.theInstructions.howSetup.stepOne.descriptionOne}(
            <a
              href="https://github.com/lmbautista"
              style={{
                color: `${Main.palette.primary.main}`,
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
              target="_blank"
            >
              {enLocale.theInstructions.howSetup.stepOne.githubUser}
            </a>
            ).
            <br />
            {enLocale.theInstructions.howSetup.stepOne.descriptionTwo}
          </Typography>
        )
      },
      stepTwo: {
        title: (
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {enLocale.theInstructions.howSetup.stepTwo.title}
          </Typography>
        ),
        explanaition: (
          <Typography variant="h6" sx={{ fontWeight: 'light' }}>
            {enLocale.theInstructions.howSetup.stepTwo.descriptionOne}
            <AnchorLink
              style={{ textDecoration: 'none', color: `${Main.palette.primary.main}` }}
              offset={HEADER_HEIGHT}
              href="#garden"
            >
              <b>{enLocale.theInstructions.howSetup.stepTwo.descriptionTwo}</b>
            </AnchorLink>
          </Typography>
        )
      },
      stepThree: {
        title: (
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {enLocale.theInstructions.howSetup.stepThree.title}
          </Typography>
        ),
        explanaition: (
          <>
            <Typography variant="h6" sx={{ fontWeight: 'light' }}>
              {enLocale.theInstructions.howSetup.stepThree.descriptionOne}
            </Typography>
            <ul style={{ margin: '0', padding: '0 0 0 15px' }}>
              <li>
                <Typography variant="h6" sx={{ fontWeight: 'light' }}>
                  {enLocale.theInstructions.howSetup.stepThree.descriptionTwo}
                </Typography>
              </li>
              <li>
                <Typography variant="h6" sx={{ fontWeight: 'light' }}>
                  {enLocale.theInstructions.howSetup.stepThree.descriptionThree}
                </Typography>
              </li>
              <li>
                <Typography variant="h6" sx={{ fontWeight: 'light' }}>
                  {enLocale.theInstructions.howSetup.stepThree.descriptionFour}
                </Typography>
              </li>
            </ul>
          </>
        )
      },
      stepFour: {
        title: (
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {enLocale.theInstructions.howSetup.stepFour.title}
          </Typography>
        ),
        explanaition: (
          <Typography variant="h6" sx={{ fontWeight: 'light' }}>
            {enLocale.theInstructions.howSetup.stepFour.description}
          </Typography>
        )
      }
    }
  };

  return { styles, props, typographies };
};

export default Statics;
