import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Atendimentos = () => {
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/atendimentos")
      .then((response) => {
        setAtendimentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar atendimentos:", error);
      });
  }, []);

  return (
    <div className="atendimentos-container">
      <h1>Atendimentos</h1>
      <p>Veja aqui os registros de atendimentos realizados na clínica.</p>

      <table className="atendimentos-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Paciente</th>
            <th>Profissional</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {atendimentos.map((atendimento, index) => (
            <tr key={index}>
              <td>{atendimento.data}</td>
              <td>{atendimento.nomePaciente}</td>
              <td>{atendimento.nomeFuncionario}</td>
              <td>{atendimento.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="back-link" style={{ marginTop: "20px" }}>
        <Link to="/">← Voltar para Home</Link>
      </div>
    </div>
  );
};

export default Atendimentos;
