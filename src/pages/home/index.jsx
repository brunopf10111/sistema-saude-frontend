import "./styles.css";

import Container from "../../containers/Container";
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <section className="hero-banner">
          <div className="hero-content">
            <h2>Sua saúde em primeiro lugar</h2>
            <p>Conheça nossos programas de prevenção e qualidade de vida</p>
            <Link to="/agendamento" className="cta-button">
              Agende uma consulta
            </Link>
          </div>
        </section>

        {/* Conteúdo principal */}
        <main className="home-content">
          {/* Sobre a clínica */}
          <section className="about-section">
            <div className="section-content">
              <h2 className="section-title">Nossa Missão</h2>
              <p className="section-text">
                Na Vida&Saúde, acreditamos que a saúde é o nosso bem mais
                precioso. Oferecemos atendimento humanizado com profissionais
                qualificados e tecnologia de ponta para cuidar de você e sua
                família.
              </p>
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">+5000</span>
                  <span className="stat-label">Pacientes atendidos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">+20</span>
                  <span className="stat-label">Especialidades</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Satisfação</span>
                </div>
              </div>
            </div>
            <div className="about-image"></div>
          </section>

          {/* Dicas de saúde */}
          <section className="health-tips">
            <h2 className="section-title">Dicas de Saúde</h2>
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon nutrition"></div>
                <h3>Alimentação Saudável</h3>
                <p>
                  Consuma frutas, verduras e legumes diariamente. Evite
                  alimentos ultraprocessados.
                </p>
              </div>
              <div className="tip-card">
                <div className="tip-icon exercise"></div>
                <h3>Atividade Física</h3>
                <p>
                  Pratique pelo menos 30 minutos de exercícios físicos moderados
                  todos os dias.
                </p>
              </div>
              <div className="tip-card">
                <div className="tip-icon sleep"></div>
                <h3>Sono de Qualidade</h3>
                <p>
                  Durma 7-8 horas por noite em um ambiente escuro e silencioso.
                </p>
              </div>
              <div className="tip-card">
                <div className="tip-icon stress"></div>
                <h3>Controle do Estresse</h3>
                <p>
                  Pratique meditação, respiração profunda ou hobbies relaxantes.
                </p>
              </div>
            </div>
          </section>

          {/* Serviços */}
          <section className="services-section">
            <h2 className="section-title">Nossos Serviços</h2>
            <div className="services-grid">
              <div className="service-card">
                <h3>Consultas Médicas</h3>
                <ul>
                  <li>Clínico Geral</li>
                  <li>Cardiologia</li>
                  <li>Pediatria</li>
                  <li>Ginecologia</li>
                  <li>E mais 15 especialidades</li>
                </ul>
              </div>
              <div className="service-card">
                <h3>Exames</h3>
                <ul>
                  <li>Laboratoriais</li>
                  <li>Imagem</li>
                  <li>Ultrassonografia</li>
                  <li>Eletrocardiograma</li>
                </ul>
              </div>
              <div className="service-card">
                <h3>Programas Especiais</h3>
                <ul>
                  <li>Controle de peso</li>
                  <li>Tratamento para tabagismo</li>
                  <li>Saúde mental</li>
                  <li>Prevenção de doenças</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
