import Container from "../../containers/Container";
import React from "react";
import axios from "axios";
import styles from "./Registro.module.css"; // usando o mesmo CSS do login
import { useForm } from "react-hook-form";

export default function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dados do formulário de registro:", data);
    axios
      .post("/api/register", data) // endpoint hipotético para registro
      .then((res) => {
        console.log("Resposta do servidor:", res.data);
      })
      .catch((err) => {
        console.error("Erro ao registrar:", err);
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
                  type="password"
                />
                {errors.password && <span>{errors.password.message}</span>}

                <label>Cargo</label>
                <select
                  {...register("cargo", {
                    required: "Cargo é obrigatório",
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione o cargo
                  </option>
                  <option value="administrador">Administrador</option>
                  <option value="usuario">Usuário</option>
                  <option value="gerente">Gerente</option>
                </select>
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
