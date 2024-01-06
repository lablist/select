import { createContext } from 'react';

export type User = {
  login: string;
}

export type SignInCredentials = {
  login: string;
  password: string;
}

export type AuthContextData = {
  user?: User;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export default AuthContext;
