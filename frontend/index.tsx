import React from "react";
import ReactDOM from "react-dom/client";  // A partir do React 18, usamos o 'react-dom/client'
import "./index.css";  // Se você estiver usando CSS
import App from "./App";  // O componente principal da aplicação
import { BrowserRouter as Router } from "react-router-dom";  // Importa o roteador para gerenciar as rotas

// Cria o root para renderizar a aplicação com o Router para habilitar o roteamento
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>  {/* Envolva a aplicação com o Router para habilitar o roteamento */}
    <App />
  </Router>
);
