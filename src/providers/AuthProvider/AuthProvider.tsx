import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, SignInCredentials, User } from '../../contexts';
import { api } from '../../services';

type Props = {
  children: ReactNode;
}

function AuthProvider(props: Props) {
  const { children } = props;
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuthenticated = Boolean(localStorage.getItem('userData') || '');

  async function signIn(credentials: SignInCredentials) {
    const { login, password } = credentials;

    try {
      const response = await api.login({login, password});
      const rsData = String(response?.data);
      localStorage.setItem('userData', rsData);
      setUser({ login: rsData });
    } catch (error) {
      console.error(error);
    }
  }

  function signOut() {
    setUser(undefined);
    localStorage.removeItem('userData');
    navigate(pathname);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      setUser(undefined);
    }
  }, [navigate, pathname, isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
