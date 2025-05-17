import './styles.css';
import { Link } from 'react-router-dom';

const Consultas = () => {
  return (
    <div className="consultas-container">
      <h1>Consultas</h1>
      <p>Confira a lista de consultas agendadas e realizadas.</p>

      <table className="consultas-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Dados vindos do banco de dados serão inseridos aqui */}
        </tbody>
      </table>

      <div className="back-link">
        <Link to="/">← Voltar para a Home</Link>
      </div>
    </div>
  );
};

export default Consultas;
