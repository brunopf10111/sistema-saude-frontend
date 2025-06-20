import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Container from "../../containers/Container";
import { IoIosSave } from "react-icons/io";
import styles from "./RegistrarMedico.module.css";
import { useNavigate } from "react-router-dom";

export default function RegistrarMedico() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/funcionarios?returnTypes=idAndNome")
      .then((res) => res.json())
      .then((data) => setFuncionarios(data));
  }, []);

  const onSubmit = (data) => {
    const payload = {
      idFuncionario: parseInt(data.idFuncionario),
      ramo: data.ramo,
    };

    console.log("Enviando JSON:", payload);

    fetch("http://localhost:8080/sec/medicos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao registrar médico");
        return res.json();
      })
      .then((result) => {
        alert("Médico registrado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        alert("Erro ao registrar médico");
        console.error(error);
      });
  };

  return (
    <Container>
      <div className={styles.paginaAgendamento}>
        <div className={styles.areaFormCliente}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formCliente}
          >
            <label>Funcionário</label>
            <select {...register("idFuncionario")} required>
              <option value="">Selecione um funcionário</option>
              {funcionarios.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nomeFuncionario || f.nome}
                </option>
              ))}
            </select>

            <label>Ramo de atuação</label>
            <input
              {...register("ramo")}
              type="text"
              placeholder="Ex: Cardiologia, Pediatria"
              required
            />

            <button type="submit" className={styles.btnSalvar}>
              <IoIosSave />
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
