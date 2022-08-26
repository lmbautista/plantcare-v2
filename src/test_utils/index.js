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

export const mockPlantcare = () => {
  const wetStatuses = [
    Math.min(Math.floor(Math.random() * 100) + 60, 100),
    Math.floor(Math.random() * 60) + 35,
    Math.floor(Math.random() * 35)
  ];
  const names = ['Ficus retusa', 'Lemon cypress', 'Olive tree', 'Elm zelkova'];
  const mockIdx = Math.floor(Math.random() * 3);

  return {
    name: names[mockIdx],
    wet: wetStatuses[mockIdx],
    planted_at: '03/03/2022',
    watered_at: '03/03/2022 15:35',
    waterings: [{ programmed_at: '03/03/2022 21:22' }],
    wet_synced_at: '03/03/2022 16:45',
    last_connection_at: '03/03/2022 16:45'
  };
};
