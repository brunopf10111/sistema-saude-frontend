import "./styles.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/medicamentos")
      .then((response) => {
        setMedicamentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar medicamentos:", error);
      });
  }, []);

  return (
    <div className="medicamentos-container">
      <h1>Medicamentos</h1>
      <p>Lista de medicamentos disponíveis na clínica.</p>

      <table className="medicamentos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Validade</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => (
            <tr key={med.id}>
              <td>{med.nome}</td>
              <td>{med.descricao}</td>
              <td>{med.quantidade}</td>
              <td>{med.validade}</td>
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

export default Medicamentos;
