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
import axios from "axios";

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    quantidade: "",
    validade: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    carregarMedicamentos();
  }, []);

  const carregarMedicamentos = () => {
    axios
      .get("http://localhost:8080/medicamentos")
      .then((res) => setMedicamentos(res.data))
      .catch((err) => console.error("Erro ao buscar medicamentos:", err));
  };

  const abrirModalEdicao = () => {
    if (medicamentoSelecionado) {
      setFormData({
        nome: medicamentoSelecionado.nome,
        descricao: medicamentoSelecionado.descricao,
        quantidade: medicamentoSelecionado.quantidade,
        validade: medicamentoSelecionado.validade,
      });
      setModalAberto(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/medicamentos/${medicamentoSelecionado.id}`,
        formData
      )
      .then(() => {
        alert("Medicamento atualizado com sucesso!");
        setModalAberto(false);
        setMedicamentoSelecionado(null);
        carregarMedicamentos();
      })
      .catch((err) => {
        console.error("Erro ao atualizar medicamento:", err);
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

  const medicamentosFiltrados = medicamentos.filter((med) => {
    const termo = filtro.toLowerCase();
    return (
      med.nome.toLowerCase().includes(termo) ||
      med.descricao.toLowerCase().includes(termo) ||
      String(med.quantidade).includes(termo) ||
      med.validade.includes(termo)
    );
  });

  const columns = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "descricao", headerName: "Descrição", flex: 2 },
    { field: "quantidade", headerName: "Quantidade (UN)", width: 150 },
    { field: "validade", headerName: "Validade", width: 150 },
  ];

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Medicamentos
        </Typography>

        <Typography variant="body1" gutterBottom>
          Lista de medicamentos disponíveis na clínica.
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
            disabled={!medicamentoSelecionado}
          ></Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IoMdAdd />}
            onClick={() => navigate("/criar-medicamento")}
          ></Button>
        </Stack>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={medicamentosFiltrados}
            columns={columns}
            getRowId={(row) => row.id}
            onRowClick={(params) =>
              setMedicamentoSelecionado(
                medicamentoSelecionado?.id === params.row.id ? null : params.row
              )
            }
            selectionModel={
              medicamentoSelecionado ? [medicamentoSelecionado.id] : []
            }
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

      <Dialog
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Editar Medicamento</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Quantidade"
              name="quantidade"
              type="number"
              value={formData.quantidade}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Validade"
              name="validade"
              type="date"
              value={formData.validade}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalAberto(false)}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Medicamentos;
