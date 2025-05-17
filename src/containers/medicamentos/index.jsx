import './styles.css';
import { Link } from 'react-router-dom';

const Medicamentos = () => {
  return (
    <div className="medicamentos-container">
      <h1>Medicamentos</h1>
      <p>Lista de medicamentos disponíveis na clínica.</p>

      <table className="medicamentos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Validade</th>
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

export default Medicamentos;
