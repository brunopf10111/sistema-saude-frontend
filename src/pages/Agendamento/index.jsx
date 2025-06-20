import "react-datepicker/dist/react-datepicker.css";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Container from "../../containers/Container";
import DatePicker from "react-datepicker";
import { IoIosSave } from "react-icons/io";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import styles from "./Agendamento.module.css";
import { useNavigate } from "react-router-dom";

export default function Agendamento() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, []);
  const { register, handleSubmit, control } = useForm();
  const [funcionarios, setFuncionarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/funcionarios?returnTypes=idAndNome")
      .then((res) => res.json())
      .then((data) => setFuncionarios(data));

    fetch("http://localhost:8080/pacientes?returnTypes=idAndNome")
      .then((res) => res.json())
      .then((data) => setPacientes(data));
  }, []);

  const onSubmit = (data) => {
    const payload = {
      data: format(data.data, "yyyy-MM-dd"),
      pacienteId: parseInt(data.pacienteId),
      funcionarioId: parseInt(userId),
      descricao: data.descricao,
    };

    console.log("Enviando JSON:", payload);

    fetch("http://localhost:8080/atendimentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao agendar");
        return res.json();
      })
      .then((result) => {
        alert("Agendamento realizado com sucesso!");
        console.log("Agendamento:", result);
      })
      .catch((error) => {
        alert("Erro ao enviar agendamento");
        console.error(error);
      });
  };

  return (
    <>
      <Container>
        <div className={styles.paginaAgendamento}>
          <div className={styles.areaFormCliente}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.formCliente}
            >
              <label>Data</label>
              <Controller
                name="data"
                control={control}
                defaultValue={new Date()}
                render={({ field }) => (
                  <DatePicker
                    className={styles.dateInput}
                    placeholderText="Selecione a data"
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />

              <label>Paciente</label>
              <select {...register("pacienteId")} defaultValue="">
                <option value="" disabled>
                  Selecione o paciente
                </option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nomePaciente}
                  </option>
                ))}
              </select>
              <Link to="/reg-paciente" className={styles.links}>
                Ainda não é nosso paciente?
              </Link>
              <label>Atendente</label>
              <select {...register("funcionarioId")} defaultValue="">
                <option value="" disabled>
                  Selecione quem atendeu o paciente
                </option>
                {funcionarios.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nomeFuncionario}
                  </option>
                ))}
              </select>

              <label>Descrição</label>
              <input
                {...register("descricao")}
                placeholder="Descreva o atendimento"
                type="text"
              />

              <button type="submit" className={styles.btnSalvar}>
                <IoIosSave />
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
