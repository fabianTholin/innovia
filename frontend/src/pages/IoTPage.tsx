import styles from "./css/IoTPage.module.css";
import Navbar from "../components/Navbar";
import SensorData from "../components/SensorData";

export default function IoTPage() {


  return (
    <main className={styles.IoTPage}>
      <Navbar />
      <button className={styles.registerButton}>En knapp</button>
      <ul className={styles.list}>
          <SensorData/>
      </ul>
    </main>
  );
}