import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["home-footer"]}>
      <div className={styles["footer-content"]}>
        <div className={styles["footer-section"]}>
          <h3>Contato</h3>
          <p>(XX) XXXX-XXXX</p>
          <p>contato@vidaesaude.com.br</p>
        </div>
        <div className={styles["footer-section"]}>
          <h3>Horário de Funcionamento</h3>
          <p>Segunda a Sexta: 7h às 19h</p>
          <p>Sábado: 8h às 12h</p>
        </div>
        <div className={styles["footer-section"]}>
          <h3>Endereço</h3>
          <p>Rua da Saúde, 123 - Centro</p>
          <p>Sua Cidade - Estado</p>
        </div>
      </div>
      <div className={styles["copyright"]}>
        <p>© 2023 Clínica Vida&Saúde - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
