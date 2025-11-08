import Header from "./components/mvpblocks/header";
import Login from "./pages/Login";
import ManagerProducts from "./pages/ManagerProducts";
import ManagerUsers from "./pages/ManagerUsers";
import PromotionProducts from "./pages/PromotionProducts";
import Users from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import ProductDetails from "./pages/ProductDetails";
import Perfil from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<Login />} />

      {/* 🔒 Rotas protegidas com Header */}
      <Route element={<Header />}>
        <Route element={<Header /> }>
          <Route path="/home" element={<ManagerProducts />} />
          <Route path="/produtos/:id" element={<ProductDetails />} />
          <Route path="/promocoes" element={<PromotionProducts />} />
          <Route path="/gestao-usuarios" element={<ManagerUsers />} />
          <Route path="/perfil/:id" element={<Perfil />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
