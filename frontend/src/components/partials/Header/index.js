import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

import { isLogged, doLogout } from '../../../helpers/authHandler'

export default function Header () {
  const logged = isLogged()

  const handleLogout = () => {
    doLogout()
    window.location.href = '/'
  }

  return (
    <div className="container">
      <div className="header-body">
        <div className="logo">
          <Link to="/" exact="true">
            <span className="logo-1">O</span>
            <span className="logo-2">L</span>
            <span className="logo-3">X</span>
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
    </div>
  )
}
