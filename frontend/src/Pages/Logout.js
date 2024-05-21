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
  }, 1 * 1000);

  return <>Logout Page</>;
};

export default Logout;



{/* <button onSubmit={handleLogout}>Sair da conta</button> */}