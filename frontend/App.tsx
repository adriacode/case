import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Clientes from "./pages/clientes";
import Ativos from "./pages/ativos";
import RelacionamentoClientesAtivos from "./pages/RelacionamentoClientesAtivos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/ativos" element={<Ativos />} />
        <Route path="/relacionamento" element={<RelacionamentoClientesAtivos />} />
      </Routes>
    </Router>
  );
};

export default App;
