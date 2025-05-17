import './styles.css';
import { Link } from 'react-router-dom';

const Atendimentos = () => {
  return (
    <div className="atendimentos-container">
      <h1>Atendimentos</h1>
      <p>Veja aqui os registros de atendimentos realizados na clínica.</p>

      <table className="atendimentos-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Paciente</th>
            <th>Profissional</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {/* Dados dinâmicos serão inseridos aqui */}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div className="back-link" style={{ marginTop: '20px' }}>
        <Link to="/">← Voltar para Home</Link>
      </div>
    </div>
  );
};

export default Atendimentos;
