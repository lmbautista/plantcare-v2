import { BrowserRouter, Routes, Route, Router, Navigate, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// UI components
import { ThemeProvider } from '@mui/material/styles';
// Components
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import ResetPassword from './pages/reset-password';
import SignupConfirmation from './pages/signup-confirmation';
import Plantcares from './pages/plantcares';
import Header from './components/header';
// Others
import Main from './themes/main';
import routes from './routes';
import User from './components/user';

import './App.scss';

export const App = () => {
  const history = createBrowserHistory();
  const {
    profile: userProfile,
    isLoggedIn: userLogged,
    signIn: signInUser,
    signOut: signOutUser
  } = User({ history });

  return (
    <>
      <Router location={history.location} navigator={history}></Router>
      <ThemeProvider theme={Main}>
        <BrowserRouter>
          <Header
            userLogged={userLogged()}
            userProfile={userProfile()}
            signOutHandler={signOutUser}
          />
          <Routes>
            <Route
              path={routes.root}
              exac
              element={
                userLogged() ? <Navigate to={routes.plantcares} /> : <Navigate to={routes.home} />
              }
            />
            <Route
              path={routes.home}
              exact
              element={userLogged() ? <Navigate to={routes.plantcares} /> : <Home />}
            />
            <Route
              path={routes.signin}
              exact
              element={
                userLogged() ? (
                  <Navigate to={routes.plantcares} />
                ) : (
                  <Signin signInHandler={signInUser} />
                )
              }
            />
            <Route
              path={routes.signup}
              exact
              element={userLogged() ? <Navigate to={routes.plantcares} /> : <Signup />}
            />
            <Route
              path={routes.resetPassword}
              exact
              element={userLogged() ? <Navigate to={routes.plantcares} /> : <ResetPassword />}
            />
            <Route
              path={routes.signupConfirmation}
              exact
              element={userLogged() ? <Navigate to={routes.plantcares} /> : <SignupConfirmation />}
            />
            <Route
              path={routes.plantcares}
              exact
              element={userLogged() ? <Plantcares /> : <Navigate to={routes.root} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
