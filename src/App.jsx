import { Route, Routes } from "react-router-dom";

import Agendamento from "./pages/Agendamento";
import Atendimentos from "./pages/atendimentos";
import Consultas from "./pages/consultas";
import Home from "./pages/home";
import Login from "./pages/Login";
import Medicamentos from "./pages/medicamentos"; // Importa a página Medicamentos
import RegistrarPaciente from "./pages/RegistrarPaciente";
import Registro from "./pages/Registro";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/atendimentos" element={<Atendimentos />} />
      <Route path="/consultas" element={<Consultas />} />
      <Route path="/medicamentos" element={<Medicamentos />} />
      <Route path="/agendamento" element={<Agendamento />} />
      <Route path="/reg-paciente" element={<RegistrarPaciente />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      {/* Rota para Medicamentos */}
    </Routes>
  );
}
