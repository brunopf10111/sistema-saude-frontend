import { Routes, Route } from "react-router-dom";
import Home from "./containers/home";
import Atendimentos from "./containers/atendimentos";
import Consultas from "./containers/consultas";
import Medicamentos from "./containers/medicamentos"; // Importa a página Medicamentos
import Agendamento from "./pages/Agendamento";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/atendimentos" element={<Atendimentos />} />
      <Route path="/consultas" element={<Consultas />} />
      <Route path="/medicamentos" element={<Medicamentos />} />
      <Route path="/agendamento" element={<Agendamento />} />
      {/* Rota para Medicamentos */}
    </Routes>
  );
}
