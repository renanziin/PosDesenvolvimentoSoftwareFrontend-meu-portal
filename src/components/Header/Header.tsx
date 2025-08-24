import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <nav>
        <div className="logo">
          <h1>Product App</h1>
        </div>
        <div className="nav-links">
          <Link to="/products">Produtos</Link>
          <Link to="/import-csv">Importar Produtos via CSV</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;