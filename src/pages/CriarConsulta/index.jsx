import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Container from "../../containers/Container";
import DatePicker from "react-datepicker";
import { IoIosSave } from "react-icons/io";
import styles from "./CriarConsulta.module.css"; // crie esse CSS se ainda não existir
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function CriarConsulta() {
  const navigate = useNavigate();
  const { register, handleSubmit, control } = useForm();

  const [medicos, setMedicos] = useState([]);
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/funcionarios?returnTypes=medicoSimples")
      .then((res) => res.json())
      .then((data) => setMedicos(data));

    fetch("http://localhost:8080/atendimentos/simples")
      .then((res) => res.json())
      .then((data) => setAtendimentos(data));
  }, []);

  const onSubmit = (data) => {
    const payload = {
      data: format(data.data, "yyyy-MM-dd"),
      hora: format(data.hora, "HH:mm"),
      status: data.status,
      medicoId: parseInt(data.medicoId),
      atendimentoId: parseInt(data.atendimentoId),
    };

    console.log("Enviando JSON:", payload);

    fetch("http://localhost:8080/consultas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao registrar consulta");

        return res.json();
      })
      .then((result) => {
        alert("Consulta registrada com sucesso!");
        navigate("/consultas");
      })
      .catch((error) => {
        alert("Erro ao registrar consulta");
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
            <label>Data da Consulta</label>
            <Controller
              name="data"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  className={styles.dateInput}
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Selecione a data"
                />
              )}
            />

            <label>Hora da Consulta</label>
            <Controller
              name="hora"
              control={control}
              defaultValue={new Date()}
              render={({ field }) => (
                <DatePicker
                  className={styles.dateInput}
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Hora"
                  dateFormat="HH:mm"
                  placeholderText="Selecione a hora"
                />
              )}
            />

            <label>Status</label>
            <input
              {...register("status")}
              type="text"
              placeholder="Ex: Pendente, Concluída"
            />

            <label>Médico Responsável</label>
            <select {...register("medicoId")}>
              <option value="">Selecione um médico</option>
              {medicos.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.nome}
                </option>
              ))}
            </select>

            <label>Atendimento</label>
            <select {...register("atendimentoId")}>
              <option value="">Selecione um atendimento</option>
              {atendimentos.map((at) => (
                <option key={at.id} value={at.id}>
                  {at.descricao}
                </option>
              ))}
            </select>

            <button type="submit" className={styles.btnSalvar}>
              <IoIosSave />
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
