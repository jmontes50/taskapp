import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./styles/Navbar.module.css";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    logout();
  };

  return (
    <>
      <nav className={styles["navbar"]}>
        <div className={styles["navbar-container"]}>
          <a href="/" className={styles["navbar-brand"]}>
            TaskApp
          </a>
          <div className={styles["navbar-menu"]}>
            <Link to="/new-task" className={styles["navbar-item"]}>
              Agregar nueva tarea
            </Link>
            <Link to="/tasks" className={styles["navbar-item"]}>
              Tareas
            </Link>
            <a
              href="#"
              className={`${styles["navbar-item"]} ${styles["primary"]}`}
              onClick={handleLogout}
            >
              Cerrar sesión
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
