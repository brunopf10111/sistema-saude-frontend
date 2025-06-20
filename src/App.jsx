import { Route, Routes } from "react-router-dom";

import Agendamento from "./pages/Agendamento";
import Atendimentos from "./pages/atendimentos";
import Consultas from "./pages/consultas";
import CriarMedicamentos from "./pages/CriarMedicamentos";
import Home from "./pages/home";
import Login from "./pages/Login";
import Medicamentos from "./pages/medicamentos";
import RegistrarPaciente from "./pages/RegistrarPaciente";
import Registro from "./pages/Registro";
import CriarConsulta from "./pages/CriarConsulta";
import RegistrarMedico from "./pages/RegistrarMedico";

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
      <Route path="/criar-medicamento" element={<CriarMedicamentos />} />
      <Route path="/criar-consulta" element={<CriarConsulta />} />
      <Route path="/registrar-medico" element={<RegistrarMedico />} />
      {/* Rota para Medicamentos */}
    </Routes>
  );
}
