import styles from './Navbar.module.css';
import Weather from '../../Weather/Weather';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavbarLink from '../NavbarLink/NavbarLink';
import Button from '../ChangeTempButton/TempButton';

function Navbar() {
  return (
    <Router>
      <div>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navLink}>
              <NavbarLink to={`/today`}> Today</NavbarLink>
            </li>
            <li className={styles.navLink}>
              <NavbarLink to={`/today-hour`}> 3 Hours</NavbarLink>
            </li>
            <li className={styles.navLink}>
              <NavbarLink to={`/5days`}> 5 Days</NavbarLink>
            </li>
            <li className={styles.navLink}>
              <NavbarLink to={`/graphs`}> Graphs</NavbarLink>
            </li>
            <Button />
          </ul>
        </nav>
        <Route path="/today" component={Weather} />
        <Route path="/today-hour" component={Weather} />
        <Route path="/5days" component={Weather} />
        <Route path="/graphs" component={Weather} />
      </div>
    </Router>
  );
}

export default Navbar;
