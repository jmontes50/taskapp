import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import imgData from "../assets/img/data.png";

const Login = () => {
  const { loginWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/tasks");
    } catch (error) {
      alert("Error al iniciar");
    }
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img src={imgData} alt="Logo" className="logo" />
        <h1 className="slogan">Bienvenido a TaskApp</h1>
      </header>
      <main className="welcome-main">
        <button className="btn btn-primary" onClick={handleLogin}>
          Iniciar sesión con Google
        </button>
        {/* <button className="btn btn-secondary">Ingresar como invitado</button> */}
      </main>
    </div>
  );
};

export default Login;
