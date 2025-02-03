import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig.js";
import { useAuth } from "../components/admin/Auth.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("User state in Login:", user)
    if (loading) return
    if (user) {
      navigate("/admin", { replace: true });
      return;
    }

    const login = async () => {
      try {
        await signInWithPopup(auth, provider);
        navigate("/admin", { replace: true });
      } catch (error) {
        console.error("Помилка входу:", error);
        navigate("/", { replace: true });
      }
    };

    login();
  }, [user, loading, navigate]);

  if (loading) return <p>Завантаження...</p>; // Покажемо текст, поки контекст завантажується

  return <p>Авторизація...</p>;
};

export default Login;
