import React from 'react'
import { Link } from 'react-router-dom'

import { HeaderArea } from './styles';

import { isLogged, doLogout } from '../../../helpers/authHandler'

export default function Header () {
  const logged = isLogged()

  const handleLogout = () => {
    doLogout()
    window.location.href = '/'
  }

  return (
    <HeaderArea>
      <div className="container">
          <div className="logo">
            <Link to="/" exact="true">
              <span className="logo-1">A</span>
              <span className="logo-2">R</span>
              <span className="logo-3">&</span>
              <span className="logo-4">N</span>
            </Link>
          </div>
        <nav className="sidebar">
          <ul>
            { logged &&
              <>
                <li>
                  <Link to="/my-account">Minha conta</Link>
                </li>
                <li>
                  <button className="nobutton" onClick={ handleLogout } >Sair</button>
                </li>
                <li>
                  <Link to="/newad" className="button" >Poste um anuncio</Link>
                </li>
              </>
            }
            {
              !logged &&
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Cadastrar</Link>
                  </li>
                </>

            }

          </ul>
        </nav>
      </div>
    </HeaderArea>
  )
}
