import Container from "../../containers/Container";
import { IoIosSave } from "react-icons/io";
import React from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados do formulário:", data);
    axios
      .post("/api/login", data)
      .then((res) => {
        console.log("Resposta do servidor:", res.data);
      })
      .catch((err) => {
        console.error("Erro ao fazer login:", err);
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
            <div className={styles.areaFormCliente}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formCliente}
              >
                <label>Usuário</label>
                <input
                  {...register("username", {
                    required: "Usuário é obrigatório",
                  })}
                  placeholder="Digite seu usuário"
                  type="text"
                />
                {errors.username && <span>{errors.username.message}</span>}

                <label>Senha</label>
                <input
                  {...register("password", { required: "Senha é obrigatória" })}
                  placeholder="Digite sua senha"
                  type="password"
                />
                {errors.password && <span>{errors.password.message}</span>}

                <button type="submit" className={styles.btnSalvar}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
