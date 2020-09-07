import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { Container } from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  function handleActiveLink(path = ''): string {
    const match = matchPath(currentPath, { path });

    return match && match.isExact ? 'active' : '';
  }

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link className={handleActiveLink('/')} to="/">
            Listagem
          </Link>
          <Link className={handleActiveLink('/import')} to="/import">
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
