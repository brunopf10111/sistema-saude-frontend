import Container from "../../containers/Container";
import React from "react";
import axios from "axios";
import styles from "./Registro.module.css"; // usando o mesmo CSS do login
import { useForm } from "react-hook-form";
import { FaPaperclip } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Registro() {
  const navigate = useNavigate();
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      nome: data.fullName,
      username: data.username,
      senha: data.password,
      cargo: data.cargo,
    };
    console.log("Dados do formulário de registro:", payload);
    axios
      .post("http://localhost:8080/sec/registrar", payload) // endpoint hipotético para registro
      .then((res) => {
        console.log("Resposta do servidor:", res.data);
        alert("Registrado com sucesso!");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Erro ao registrar:", err);
        alert("Registro NÃO foi realizado");
      });
  };

  return (
    <Container>
      <div className={styles.divisor}>
        <div className={styles.imgLog}>
          <img src="/este.jpg" alt="Hero" />
        </div>
        <div className={styles.formLog}>
          <div className={styles.paginaAgendamento}>
            <FaPaperclip className={styles.iconPaperclip} />
            <div className={styles.areaFormCliente}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formCliente}
              >
                <label>Nome Completo</label>
                <input
                  {...register("fullName", {
                    required: "Nome completo é obrigatório",
                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  })}
                  placeholder="Digite seu nome completo"
                  type="text"
                />
                {errors.fullName && <span>{errors.fullName.message}</span>}

                <label>Usuário</label>
                <input
                  {...register("username", {
                    required: "Usuário é obrigatório",
                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                  })}
                  placeholder="Digite seu usuário"
                  type="text"
                />
                {errors.username && <span>{errors.username.message}</span>}

                <label>Senha</label>
                <input
                  {...register("password", {
                    required: "Senha é obrigatória",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  })}
                  placeholder="Digite sua senha"
                />
                {errors.password && <span>{errors.password.message}</span>}

                <label>Cargo</label>
                <input
                  {...register("cargo", {
                    required: "Inserir cargo é obrigatório",
                  })}
                  placeholder="Digite seu cargo"
                />

                {errors.cargo && <span>{errors.cargo.message}</span>}

                <button type="submit" className={styles.btnSalvar}>
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
