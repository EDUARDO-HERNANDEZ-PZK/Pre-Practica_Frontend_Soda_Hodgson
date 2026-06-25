import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { Navigate } from "react-router-dom";
import { useUsers } from "../hooks/useUser";
import LoginLeftPanel from "../components/layout/login/LoginLeftPanel";
import LoginForm from "../components/layout/login/LoginForm";

export default function Login() {
  const { data: users = [], isLoading } = useUsers();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [currentTime, setCurrentTime] = useState(new Date());

  const loggedUser = localStorage.getItem("user");
  useEffect(() => {
  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

  if (loggedUser) {
    return <Navigate to="/" replace />;
  }

  const login = async (e: any) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password_hash === password
    );

    if (!user) {
      setError("Usuario o contraseña incorrectos");
      setPassword("");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

return (

  <div
    className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-cyan-900
      flex
      items-center
      justify-center
      p-6
    "
  >

    <div
      className="
        w-full
        max-w-6xl
        bg-white
        rounded-[35px]
        overflow-hidden
        shadow-2xl
        grid
        lg:grid-cols-2
      "
    >

      <LoginLeftPanel
        currentTime={currentTime}
      />

      <LoginForm
        username={username}
        password={password}
        error={error}
        showPassword={showPassword}
        setUsername={setUsername}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        login={login}
      />

    </div>

  </div>

);
}