import { useState } from "react";
import { Input } from "./ui/input";
import { LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const FormLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const users = [
    { username: "admin", password: "1234", role: "ADMIN" },
    { username: "user", password: "abcd", role: "USER" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (foundUser) {
        
        const fakeToken = btoa(`${foundUser.username}:${foundUser.role}`);
        localStorage.setItem("token", fakeToken);
        localStorage.setItem("userRole", foundUser.role);

        
        navigate("/produtos");
      } else {
        setError("Usuário ou senha inválidos!");
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-10 bg-[#f5f5f5] flex flex-col justify-center w-96 rounded-lg shadow-lg">
      <div className="flex justify-center items-center w-full">
        <img src={logo} alt="Logo" className="w-28" />
      </div>
      <h2 className="scroll-m-20 text-[#000103] text-center text-4xl font-bold tracking-tight text-balance">
        Entrar
      </h2>

      <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 space-y-2">
          {/* Usuário */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium text-[#000103]">
              Usuário
            </label>
            <div className="relative">
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-9 py-4 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6B70F]"
                placeholder="Digite seu usuário"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Mail className="text-[#000103a4] size-5" />
              </div>
            </div>
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-[#000103]">
              Senha
            </label>
            <div className="relative">
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-9 py-4 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6B70F]"
                placeholder="Digite sua senha"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <LockKeyhole className="text-[#000103a4] size-5" />
              </div>
            </div>
          </div>

          {/* Botão */}
          <div className="mt-6 flex justify-center items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full text-center bg-purple-700 px-4 text-white font-bold py-2 rounded-md hover:border-zinc-300 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>

          {/* Mensagem de erro */}
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
