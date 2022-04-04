import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../providers/AppProvider';

const useLogout = () => {
  const history = useHistory();
  const { setLoggedIn } = useAppContext();

  const logout = () => {
    Cookies.remove('userToken', { path: '/' });
    setLoggedIn(false);
    history.push('/');
  };

  return { logout };
};

export default useLogout;
