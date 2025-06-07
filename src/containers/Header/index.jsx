import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { FaPaperclip } from "react-icons/fa6";

export default function Header() {
  const userId = sessionStorage.getItem("userId");
  const showExit = !!userId;
  const navigate = useNavigate();
  const clicado = () => {
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    if (!userId) {
      navigate("/login");
    } else {
      alert("Você já está logado");
    }
  };

  return (
    <div className={styles["home-container"]}>
      <header className={styles["home-header"]}>
        <div className={styles["logo-container"]}>
          <Link to="/">
            <h1 className={styles["clinic-name"]}>Vida&Saúde</h1>
          </Link>
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
          <Link to="/register" className={styles["nav-icon"]}>
            <FaPaperclip />
          </Link>
          {showExit && (
            <Link
              to="/"
              className={styles["nav-icon"]}
              onClick={() => {
                sessionStorage.removeItem("userId");
                window.location.reload();
              }}
            >
              <ImExit />
            </Link>
          )}
          <span className={styles["nav-icon"]} onClick={clicado}>
            <FaUser />
          </span>
        </nav>
      </header>
    </div>
  );
}
