import { UserContextProvider } from '../UserContext';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import User from '../components/user';
import * as Utils from '../utils';

export const USER_API_TOKEN = 'asi0o12309djknsdoi8';
export const LoggedUserContextProvider = ({ children, section = null }) => {
  const history = createMemoryHistory();
  let wrapper;

  if (section !== null) {
    history.push(section);
    wrapper = (
      <Router location={history.location} navigator={history}>
        {children}
      </Router>
    );
  } else {
    wrapper = <>{children}</>;
  }

  Utils.setSessionCookies(
    { email: 'lmiguelbautista@gmail.com', api_token: USER_API_TOKEN },
    history
  );
  const user = User({ history });

  return <UserContextProvider user={user}>{wrapper}</UserContextProvider>;
};
