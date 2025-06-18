import "./styles.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Container from "../../containers/Container";
import { DataGrid } from "@mui/x-data-grid";
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";
import axios from "axios";

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

  const columns = [
    { field: "data", headerName: "Data", width: 150 },
    { field: "nomePaciente", headerName: "Paciente", width: 200 },
    { field: "nomeFuncionario", headerName: "Profissional", width: 200 },
    { field: "descricao", headerName: "Descrição", width: 300 },
  ];

  const rows = atendimentos.map((atendimento, index) => ({
    id: index,
    data: atendimento.data,
    nomePaciente: atendimento.nomePaciente,
    nomeFuncionario: atendimento.nomeFuncionario,
    descricao: atendimento.descricao,
  }));

  return (
    <>
      <Header />
      <Container>
        <div className="atendimentos-container">
          <h1>Atendimentos</h1>
          <p>Veja aqui os registros de atendimentos realizados na clínica.</p>

          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
            />
          </div>

          <button
            onClick={() => navigate("/agendamento")}
            className="button"
            style={{ marginTop: 20 }}
          >
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
