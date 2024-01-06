import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useSession } from '../../hooks';
import { AuthProvider } from '../../providers';
import { paths } from '../../router';

const mockNavigate = jest.fn();

jest.mock('../../services/api');
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: paths.LOGIN_PATH
  })
}));

function SampleComponent() {
  const { signIn, signOut } = useSession();

  return (
    <div>
      <button
        onClick={() =>
          signIn({
            login: 'admin',
            password: 'password'
          })
        }
      >
        Sign in
      </button>

      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

function customRender() {
  render(
    <AuthProvider>
      <SampleComponent />
    </AuthProvider>
  )
}

describe('AuthProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('when the user clicks on the logout button', () => {
    it('should dispatch signOut function', async () => {
      customRender();

      const signOutButton = screen.getByRole('button', { name: /sign out/i });

      fireEvent.click(signOutButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toBeCalledWith(paths.LOGIN_PATH);
      });
    });
  });
});
