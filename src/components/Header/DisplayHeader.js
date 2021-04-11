import styles from './DisplayHeader.module.css';
import Navbar from './Navbar/Navbar';
function DisplayHeader() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Weather App</h1>
      <Navbar />
    </div>
  );
}

export default DisplayHeader;
