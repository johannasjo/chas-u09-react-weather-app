import { Link as RouterLink } from 'react-router-dom';
// connect style to this particular component
import styles from './NavbarLink.module.css';

function NavbarLink(props) {
  return <RouterLink className={styles.NavbarLink} {...props} />;
}

export default NavbarLink;
