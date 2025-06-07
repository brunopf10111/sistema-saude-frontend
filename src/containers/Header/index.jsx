import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles["home-container"]}>
      <header className={styles["home-header"]}>
        <div className={styles["logo-container"]}>
          <h1 className={styles["clinic-name"]}>Vida&Saúde</h1>
          <p className={styles["clinic-slogan"]}>
            Cuidando de você com amor e excelência
          </p>
        </div>

        <nav className={styles["nav-buttons"]}>
          <Link to="/consultas" className={styles["nav-button"]}>
            Consultas
          </Link>
          <Link to="/medicamentos" className={styles["nav-button"]}>
            Medicamentos
          </Link>
          <Link to="/atendimentos" className={styles["nav-button"]}>
            Atendimentos
          </Link>
        </nav>
      </header>
    </div>
  );
}
