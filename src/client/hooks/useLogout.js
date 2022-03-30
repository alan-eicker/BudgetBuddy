import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const useLogout = () => {
  const history = useHistory();

  const logout = () => {
    Cookies.remove('userToken', { path: '/' });
    history.push('/');
  };

  return { logout };
};

export default useLogout;
