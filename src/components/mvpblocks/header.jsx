import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Menu, X, User, Settings, LogOut } from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "@/assets/logo2.png";

const navItems = [
 
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const name = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    if (id && name && role) {
      setUser({ id, name, role, email });
    } else {
      navigate("/"); // redireciona pro login se não houver usuário logado
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "border-border/50 bg-background/80 border-b shadow-sm backdrop-blur-md"
            : "bg-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mx-auto w-full">
          <div className="flex h-16 items-center justify-between bg-purple-300 px-6 rounded-b-lg shadow">
            {/* LOGO */}
            <Link to="/home" className="flex items-center space-x-3">
              <div className="relative">
                <div className="flex h-6 w-7 items-center justify-center rounded-xl shadow-lg">
                  <img src={logo} alt="logo" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground text-lg font-bold">
                  Mercado Online.
                </span>
                <span className="text-muted-foreground -mt-1 text-xs">
                  compre mais, pague menos
                </span>
              </div>
            </Link>

            {/* NAV LINKS */}
            <nav className="hidden items-center space-x-1 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className="text-foreground/80 hover:text-foreground relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* PERFIL */}
            <div className="hidden lg:flex items-center space-x-3 relative" ref={profileRef}>
              <div
                className="flex items-center space-x-2 cursor-pointer hover:bg-purple-200 rounded-lg px-3 py-2 transition"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User className="w-5 h-5 text-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {user.name.split(" ")[0]}
                </span>
              </div>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-52 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50"
                  >
                    <div className="flex flex-col py-2">
                      <div className="px-4 py-2 border-b text-xs text-gray-500">
                        {user.email}
                      </div>

                      {/* ✅ Ver Perfil */}
                      <button
                        onClick={() => {
                          navigate(`/perfil/${user.id}`);
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-left"
                      >
                        <User className="w-4 h-4" /> Meu Perfil
                      </button>

                      {/* ✅ Gerenciamento de Perfil (apenas admin) */}
                      {user.role?.toLowerCase() === "admin" && (
                        <button
                          onClick={() => {
                            navigate("/gestao-usuarios"); // nova rota
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-left"
                        >
                          <Settings className="w-4 h-4" /> Gerenciamento de Perfil
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4" /> Sair
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* MOBILE MENU BUTTON */}
            <motion.button
              className="text-foreground hover:bg-muted rounded-lg p-2 transition-colors duration-200 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="mt-30 mx-12">
        <Outlet />
      </main>
    </>
  );
}
