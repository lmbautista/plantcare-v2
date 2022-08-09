import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Router, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Context } from './Context';

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
  const { setCurrentUser } = useContext(Context);
  const user = User({ history });
  const userIsLogged = user.isLoggedIn();

  useEffect(() => {
    setCurrentUser(user);
  }, [JSON.stringify(user)]);

  return (
    <>
      <Router location={history.location} navigator={history}></Router>
      <ThemeProvider theme={Main}>
        <BrowserRouter>
          <Header
            userLogged={userIsLogged}
            userProfile={user.profile()}
            signOutHandler={user.signOut}
          />
          <Routes>
            <Route
              path={routes.root}
              exac
              element={
                userIsLogged ? <Navigate to={routes.plantcares} /> : <Navigate to={routes.home} />
              }
            />
            <Route
              path={routes.home}
              exact
              element={userIsLogged ? <Navigate to={routes.plantcares} /> : <Home />}
            />
            <Route
              path={routes.signin}
              exact
              element={
                userIsLogged ? (
                  <Navigate to={routes.plantcares} />
                ) : (
                  <Signin signInHandler={user.signIn} />
                )
              }
            />
            <Route
              path={routes.signup}
              exact
              element={userIsLogged ? <Navigate to={routes.plantcares} /> : <Signup />}
            />
            <Route
              path={routes.resetPassword}
              exact
              element={userIsLogged ? <Navigate to={routes.plantcares} /> : <ResetPassword />}
            />
            <Route
              path={routes.signupConfirmation}
              exact
              element={userIsLogged ? <Navigate to={routes.plantcares} /> : <SignupConfirmation />}
            />
            <Route
              path={routes.plantcares}
              exact
              element={userIsLogged ? <Plantcares /> : <Navigate to={routes.root} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
