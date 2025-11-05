import Header from "./components/mvpblocks/header";
import Login from "./pages/Login";
import ManagerProducts from "./pages/ManagerProducts";
import ManagerUsers from "./pages/ManagerUsers";
import PromotionProducts from "./pages/PromotionProducts";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";

function App() {
  return (
    <>
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<Login />} />

      {/* Rotas com layout do Header */}
      <Route element={<Header />}>
        <Route path="/produtos" element={<ManagerProducts />} />
        <Route path="/promocoes" element={<PromotionProducts />} />
        <Route path="/gestao-usuarios" element={<ManagerUsers />} />
        <Route path="/usuario" element={<Users />} />
      </Route>

      {/* Rota coringa (opcional) */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    </>
  );
}

export default App;
