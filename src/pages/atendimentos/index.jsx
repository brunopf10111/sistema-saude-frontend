import "./styles.css";

import { useEffect, useState } from "react";

import Container from "../../containers/Container";
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Atendimentos = () => {
  const navigate = useNavigate();
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
    <>
      <Header />
      <Container>
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
          <button onClick={() => navigate("/agendamento")} className="button">
            Deseja agendar um atendimento?
          </button>
          <div className="back-link" style={{ marginTop: "20px" }}>
            <Link to="/">← Voltar para Home</Link>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Atendimentos;
