import { useRoutePaths, useSession } from '../../hooks';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const { isAuthenticated, user, signOut } = useSession();
  const { ROOT_PATH, LOGIN_PATH, BROWSE_PATH } = useRoutePaths();

  const getClass = (props: { isActive: boolean }) => (props.isActive ? "link-active" : "link");

  return (
    <nav>
      <ul>
        <li>
          <NavLink to={ROOT_PATH} className={getClass}>Home</NavLink>
        </li>
        <li>
          <NavLink to={LOGIN_PATH} className={getClass}>Login</NavLink>
        </li>
        <li>
          <NavLink to={BROWSE_PATH} className={getClass}>Browse</NavLink>
        </li>
      </ul>

      {isAuthenticated && (
        <div className="user">
          <span className="user-login" style={{ marginRight: 4 }}>{user?.login}</span>
          <button onClick={signOut}>Logout</button>
        </div>
      )}
    </nav>
  )
}

export default NavBar;
