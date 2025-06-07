import Container from "../../containers/Container";
import { IoIosSave } from "react-icons/io";
import React from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const payload = {
      username: data.username,
      senha: data.password,
    };
    console.log("Dados do formulário:", payload);
    axios
      .post("http://localhost:8080/sec", payload)
      .then((res) => {
        console.log("Resposta do servidor:", res.data);
        alert("Login feito com sucesso");
        sessionStorage.setItem("userId", res.data.toString());
        navigate("/");
      })
      .catch((err) => {
        console.error("Erro ao fazer login:", err);
        alert("Usuário ou senha incorretos");
      });
  };

  return (
    <Container>
      <div className={styles.divisor}>
        <div className={styles.imgLog}>
          <img src="/este.jpg" alt="Hero" />
        </div>
        <div className={styles.formLog}>
          <IoIosLogIn />
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
                <a
                  onClick={() =>
                    alert(
                      "Registro autorizado somente por funcionários, entre em contato (38)9-9999-9999 para mais detalhes"
                    )
                  }
                >
                  Ainda não foi registrado?
                </a>

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
