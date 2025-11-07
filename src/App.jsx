import Header from "./components/mvpblocks/header";
import Login from "./pages/Login";
import ManagerProducts from "./pages/ManagerProducts";
import ManagerUsers from "./pages/ManagerUsers";
import PromotionProducts from "./pages/PromotionProducts";
import Users from "./pages/Users";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<Login />} />

      {/* Rotas com Header e proteção */}
      <Route element={<Header />}>
        <Route element={<PrivateRoute />}>
          <Route path="/produtos" element={<ManagerProducts />} />
          <Route path="/promocoes" element={<PromotionProducts />} />
          <Route path="/gestao-usuarios" element={<ManagerUsers />} />
          <Route path="/usuario" element={<Users />} />
        </Route>
      </Route>

      {/* Rota coringa (opcional) */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
