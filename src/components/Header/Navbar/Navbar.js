import styles from './Navbar.module.css';
import NavbarLink from '../NavbarLink/NavbarLink';
import Button from '../ChangeTempButton/TempButton';

function Navbar() {
  return (
    <div>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navLink}>
            <NavbarLink to={`/today`}> Today</NavbarLink>
          </li>
          <li className={styles.navLink}>
            <NavbarLink to={`/longterm`}> 3 Hours</NavbarLink>
          </li>
          <li className={styles.navLink}>
            <NavbarLink to={`/longterm?daily`} replace>
              5 Days
            </NavbarLink>
          </li>
          {/*  <li className={styles.navLink}>
            <NavbarLink to={`/graphs`}> Graphs</NavbarLink>
          </li> */}
          <Button />
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
