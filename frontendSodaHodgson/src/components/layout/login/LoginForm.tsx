import React from "react";
import {
  Eye,
  EyeOff,
  Lock,
  User,
} from "lucide-react";

interface Props {
  username: string;
  password: string;
  error: string;
  showPassword: boolean;

  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setShowPassword: (value: boolean) => void;

  login: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<Props> = ({
  username,
  password,
  error,
  showPassword,
  setUsername,
  setPassword,
  setShowPassword,
  login,
}) => {
  return (
    <div className="flex flex-col justify-center p-12">

      <div className="mb-10">

        <h2 className="text-4xl font-bold text-slate-800">
          ¡Bienvenido!
        </h2>

        <p className="text-slate-500 mt-3">
          Inicia sesión para continuar.
        </p>

      </div>

      <form
        onSubmit={login}
        className="space-y-6"
      >

        {/* Usuario */}

        <div>

          <label className="text-sm font-semibold text-slate-600">
            Usuario
          </label>

          <div
            className="
              mt-2
              flex
              items-center
              border
              border-slate-300
              rounded-2xl
              px-4
              py-4
              focus-within:ring-2
              focus-within:ring-cyan-500
            "
          >

            <User
              size={20}
              className="text-slate-400"
            />

            <input
              className="
                flex-1
                ml-3
                outline-none
                bg-transparent
              "
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

        </div>

        {/* Contraseña */}

        <div>

          <label className="text-sm font-semibold text-slate-600">
            Contraseña
          </label>

          <div
            className="
              mt-2
              flex
              items-center
              border
              border-slate-300
              rounded-2xl
              px-4
              py-4
              focus-within:ring-2
              focus-within:ring-cyan-500
            "
          >

            <Lock
              size={20}
              className="text-slate-400"
            />

            <input
              className="
                flex-1
                ml-3
                outline-none
                bg-transparent
              "
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff
                  size={20}
                  className="text-slate-500"
                />
              ) : (
                <Eye
                  size={20}
                  className="text-slate-500"
                />
              )}
            </button>

          </div>

        </div>

        {error && (

          <div
            className="
              bg-red-100
              border
              border-red-300
              text-red-600
              rounded-xl
              p-4
            "
          >
            {error}
          </div>

        )}

        <button
          className="
            w-full
            bg-gradient-to-r
            from-cyan-600
            to-cyan-500
            hover:from-cyan-700
            hover:to-cyan-600
            text-white
            py-4
            rounded-2xl
            font-bold
            shadow-lg
            transition-all
            duration-300
            hover:scale-[1.02]
          "
        >
          Iniciar Sesión
        </button>

        <p className="text-center text-sm text-slate-400 pt-2">
          Tu información está protegida.
        </p>

      </form>

    </div>
  );
};

export default LoginForm;