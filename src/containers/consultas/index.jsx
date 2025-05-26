import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/consultas")
      .then((response) => {
        setConsultas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar consultas:", error);
      });
  }, []);

  return (
    <div className="consultas-container">
      <h1>Consultas</h1>
      <p>Confira a lista de consultas agendadas e realizadas.</p>

      <table className="consultas-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta, index) => (
            <tr key={index}>
              <td>{consulta.data}</td>
              <td>{consulta.nomePaciente}</td>
              <td>{consulta.nomeMedico}</td>
              <td>{consulta.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="back-link">
        <Link to="/">← Voltar para a Home</Link>
      </div>
    </div>
  );
};

export default Consultas;
