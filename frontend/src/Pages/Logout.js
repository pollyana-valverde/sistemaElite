import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navegacao = useNavigate();

  const handleLogout = () => {
    setToken();
    navegacao("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 1 * 1500);

  return <div className="tableSistemaGeral d-flex"><h4>Saindo do sistema</h4> <i className="pi pi-spin pi-spinner-dotted" style={{ fontSize: '2rem' }}></i></div>;
};

export default Logout;



{/* <button onSubmit={handleLogout}>Sair da conta</button> */ }