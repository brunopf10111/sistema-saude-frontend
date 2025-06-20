import "react-datepicker/dist/react-datepicker.css";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Container from "../../containers/Container";
import DatePicker from "react-datepicker";
import { IoIosSave } from "react-icons/io";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import styles from "./CriarMedicamentos.module.css";
import { useNavigate } from "react-router-dom";

export default function Agendamento() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      //navigate("/login");
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
      validade: format(data.validade, "yyyy-mm-dd"),
      descricao: data.descricao,
      nome: data.nome,
      quantidade: data.quantidade,
    };

    console.log("Enviando JSON:", payload);

    fetch("http://localhost:8080/medicamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao agendar");
        return res.json();
      })
      .then((result) => {
        alert("Medicamento registrado com sucesso");
        console.log("Agendamento:", result);
      })
      .catch((error) => {
        alert("Erro ao registrar medicamento");
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
              <label>Nome do Medicamento</label>
              <input
                {...register("nome")}
                placeholder="Escreva aqui o nome do medicamento"
                type="text"
              />
              <label>Descrição</label>
              <input
                {...register("descricao")}
                placeholder="Dê uma breve descrição da função do medicamento"
                type="text"
              />
              <label>Quantidade (Unidade)</label>
              <input
                {...register("quantidade")}
                placeholder="Escreva aqui a quantidade de unidades embaladas"
                type="number"
              />
              <label>Validade</label>
              <Controller
                name="validade"
                control={control}
                defaultValue={new Date()}
                render={({ field }) => (
                  <DatePicker
                    className={styles.dateInput}
                    placeholderText="Selecione a validade"
                    selected={field.value}
                    onChange={field.onChange}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
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
