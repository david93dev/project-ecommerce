import { Input } from "./ui/input";
import { LockKeyhole } from "lucide-react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const FormLogin = () => {
  return (
    <div className="p-10 bg-[#f5f5f5] flex flex-col justify-center w-96 rounded-lg shadow-lg">
      <div className="flex justify-center items-center w-full">
        <img src={logo} alt="Logo" className="w-28" />
      </div>
      <h2 className="scroll-m-20 text-[#000103] text-center text-4xl font-bold tracking-tight text-balance">
        Entrar
      </h2>
      <div>
        <form className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2 space-y-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#000103]"
              >
                Usuário
              </label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  className="w-full px-9 py-4 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6B70F]"
                  placeholder="Digite seu email"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Mail className="text-[#000103a4] size-5" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#000103]"
              >
                Senha
              </label>
              <div className="relative">
                <Input
                  type="password"
                  id="password"
                  className="w-full px-9 py-4 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E6B70F]"
                  placeholder="Digite sua senha"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <LockKeyhole className="text-[#000103a4] size-5" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center items-center">
              <Link
                to="/produtos"
                className="w-full text-center bg-purple-700 px-4 text-white font-bold py-2 rounded-md hover:border-zinc-300 transition-colors duration-300"
              >
                Entrar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
