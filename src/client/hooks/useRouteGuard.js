import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const useRouteGuard = ({ routeMatchers, onErrorRedirect }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const verifyToken = () => {
    if (!pathname.match(routeMatchers)) return;

    const token = Cookies.get('userToken');

    if (!token) {
      history.push(onErrorRedirect);
      return;
    }

    const secret = process.env.JWT_SECRET;
    const isValidToken = jwt.verify(token, secret);

    if (!isValidToken) {
      history.push(onErrorRedirect);
    }
  };

  return { verifyToken };
};

export default useRouteGuard;
