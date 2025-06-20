import "./styles.css";

import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { FaPencil } from "react-icons/fa6";
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../containers/Modal";
import axios from "axios";

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    data: "",
    hora: "",
    pacienteId: "",
    funcionarioId: "",
    status: "",
  });
  const [funcionarios, setFuncionarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarConsultas();
    carregarFuncionarios();
    carregarPacientes();
  }, []);

  const carregarConsultas = () => {
    axios
      .get("http://localhost:8080/consultas")
      .then((res) => {
        setConsultas(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error("Erro ao buscar consultas:", err));
  };

  const carregarFuncionarios = () => {
    axios
      .get("http://localhost:8080/funcionarios?returnTypes=idAndNome")
      .then((res) => setFuncionarios(res.data))
      .catch((err) => console.error("Erro ao buscar funcionários:", err));
  };

  const carregarPacientes = () => {
    axios
      .get("http://localhost:8080/pacientes?returnTypes=idAndNome")
      .then((res) => setPacientes(res.data))
      .catch((err) => console.error("Erro ao buscar pacientes:", err));
  };

  const abrirModalEdicao = () => {
    if (consultaSelecionada) {
      setFormData({
        id: consultaSelecionada.id,
        data: consultaSelecionada.data,
        hora: consultaSelecionada.hora,
        pacienteId: consultaSelecionada.pacienteId || "",
        funcionarioId: consultaSelecionada.funcionarioId || "",
        status: consultaSelecionada.status,
      });
      setModalAberto(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/consultas/${formData.id}`, formData)
      .then(() => {
        alert("Consulta atualizada com sucesso!");
        setModalAberto(false);
        setConsultaSelecionada(null);
        carregarConsultas();
      })
      .catch((err) => {
        console.error("Erro ao atualizar consulta:", err);
        alert("Erro ao atualizar.");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const consultasFiltradas = consultas.filter((c) => {
    const termo = filtro.toLowerCase();
    return (
      c.data.toLowerCase().includes(termo) ||
      c.hora.toLowerCase().includes(termo) ||
      c.nomePaciente.toLowerCase().includes(termo) ||
      c.nomeMedico.toLowerCase().includes(termo) ||
      c.status.toLowerCase().includes(termo)
    );
  });

  const columns = [
    { field: "data", headerName: "Data", width: 120 },
    { field: "hora", headerName: "Hora", width: 100 },
    { field: "nomePaciente", headerName: "Paciente", flex: 1 },
    { field: "nomeMedico", headerName: "Médico", flex: 1 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Consultas
        </Typography>

        <Typography variant="body1" gutterBottom>
          Lista de consultas agendadas.
        </Typography>

        <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
          <TextField
            label="Pesquisar"
            variant="outlined"
            value={filtro}
            onChange={handleFiltroChange}
            fullWidth
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FaPencil />}
            onClick={abrirModalEdicao}
            disabled={!consultaSelecionada}
          ></Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IoMdAdd />}
            onClick={() => navigate("/criar-consulta")}
          ></Button>
        </Stack>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={consultasFiltradas}
            columns={columns}
            getRowId={(row) => row.id}
            onRowClick={(params) =>
              setConsultaSelecionada(
                consultaSelecionada?.id === params.row.id ? null : params.row
              )
            }
            selectionModel={consultaSelecionada ? [consultaSelecionada.id] : []}
            disableRowSelectionOnClick={false}
            sx={{
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
        </div>

        <Link
          to="/"
          style={{
            textDecoration: "none",
            marginTop: "20px",
            display: "block",
          }}
        >
          ← Voltar para Home
        </Link>
      </Container>
      <Footer />
      <Modal
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        className="form-edicao"
      >
        <h2>Editar Consulta</h2>
        <form onSubmit={handleSubmit}>
          <label>Data</label>
          <input
            name="data"
            type="date"
            value={formData.data}
            onChange={handleInputChange}
          />

          <label>Hora</label>
          <input
            name="hora"
            type="time"
            value={formData.hora}
            onChange={handleInputChange}
          />

          <label>Paciente</label>
          <select
            name="pacienteId"
            value={formData.pacienteId}
            onChange={handleInputChange}
          >
            <option value="">Selecione o paciente</option>
            {pacientes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nomePaciente}
              </option>
            ))}
          </select>

          <label>Médico</label>
          <select
            name="funcionarioId"
            value={formData.funcionarioId}
            onChange={handleInputChange}
          >
            <option value="">Selecione o médico</option>
            {funcionarios.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nomeFuncionario}
              </option>
            ))}
          </select>

          <label>Status</label>
          <input
            name="status"
            type="text"
            value={formData.status}
            onChange={handleInputChange}
          />

          <button type="submit">Salvar</button>
        </form>
      </Modal>
    </>
  );
};

export default Consultas;
