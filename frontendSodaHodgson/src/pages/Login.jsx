import { useState } from "react";
import { Navigate } from "react-router-dom";
import { usersData } from "../data/users";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loggedUser = localStorage.getItem("user");

  if (loggedUser) {
    return <Navigate to="/" replace />;
  }

  const login = (e) => {

    e.preventDefault();

    const user = usersData.find(

      (u) =>
        u.email === email &&
        u.password === password

    );

    if (!user) {

      setError("Correo o contraseña incorrectos");
      return;

    }

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    window.location.href = "/";

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-900">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

        <h1 className="text-4xl font-bold text-center">
          Soda Hodgson
        </h1>

        <p className="text-center text-slate-500 mt-2">
          Sistema de Gestión
        </p>

        <form
          onSubmit={login}
          className="space-y-5 mt-8"
        >

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-2xl p-4"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-2xl p-4"
          />

          {

            error && (

              <div className="bg-red-100 text-red-600 p-3 rounded-xl">

                {error}

              </div>

            )

          }

          <button
            className="
            w-full
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            p-4
            rounded-2xl
            font-bold
            "
          >

            Iniciar Sesión

          </button>

        </form>

        <div className="mt-8 text-sm text-slate-500">

          <p>Administrador</p>

          <p>admin@sodahodgson.com</p>

          <p>admin123</p>

        </div>

      </div>

    </div>

  );

}