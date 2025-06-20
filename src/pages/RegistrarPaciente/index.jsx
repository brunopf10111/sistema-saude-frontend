import "react-datepicker/dist/react-datepicker.css";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Container from "../../containers/Container";
import DatePicker from "react-datepicker";
import { IoIosSave } from "react-icons/io";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import styles from "./RegistrarPaciente.module.css";
import { useNavigate } from "react-router-dom";

export default function RegistrarPaciente() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
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
      nomePaciente: data.nomePaciente,
      condicao: data.sintoma,
    };

    console.log("Enviando JSON:", payload);

    fetch("http://localhost:8080/pacientes", {
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
              <label>Nome Completo</label>
              <input
                {...register("nomePaciente")}
                placeholder="Escreva seu nome"
                type="text"
              />

              <label>Descreva os seus sintomas ou alguma cormobidade</label>

              <input
                {...register("sintoma")}
                placeholder="Escreva como você está sentindo"
                type="text"
              />
              <Link to="/agendamento" className={styles.links}>
                Já é nosso paciente?
              </Link>
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
