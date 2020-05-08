/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import useAPI from '../../helpers/API'

import './styles.css'

import { doLogin } from '../../helpers/authHandler'

export default function Register () {
  const api = useAPI()

  const [name, setName] = useState('')
  const [stateLoc, setStateLoc] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [chk_password, setChkPassword] = useState('')

  const [stateList, setStateList] = useState([])

  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getStates()
      setStateList(sList)
    }

    getStates()
  }, [])

  async function handleRegister (e) {
    e.preventDefault()
    setDisabled(true)
    setError('')

    if (password !== chk_password) {
      setError('Senhas não são iguais!!!')
      setDisabled(false)
      return
    }

    try {
      const json = await api.postRegister(name, stateLoc, email, password)
      if (json.error) {
        setError(json.error)
      } else {
        doLogin(json.token)
        window.location.href = '/'
      }
    } catch (er) {
      alert('Erro: ' + er)
    }

    setDisabled(false)
  }

  return (
    <div className="container">
      <div className="signin-header">Cadastro</div>
      { error &&
        <div className="error-message">{ error }</div>
      }
      <div className="signin-body">

        <form className="form-noimg form-cadastro" onSubmit={ handleRegister }>

          <label htmlFor="" className="area">
            <div className="area--title">Nome</div>
            <div className="area--input">
              <input type="text" id="name" name="name" value={ name } onChange={ e => setName(e.target.value) } disabled={ disabled } required/>
            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select value={ stateLoc } onChange={ e => setStateLoc(e.target.value) } disabled={ disabled } required >
                <option></option>
                { stateList.map((i, k) =>
                  <option key={ k } value={ i.idState }>{ i.nameState }</option>
                ) }
              </select>
            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input type="email" id="email" name="email" value={ email } onChange={ e => setEmail(e.target.value) } disabled={ disabled } required/>
            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input type="password" id="password" name="password" value={ password } onChange={ e => setPassword(e.target.value) } disabled={ disabled } required/>

            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title">Confirma senha</div>
            <div className="area--input">
              <input type="password" id="conf_password" name="conf_password" value={ chk_password } onChange={ e => setChkPassword(e.target.value) } disabled={ disabled } required/>

            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button className="btn btn-success" disabled={ disabled } >Cadastrar</button>
              <button className="btn btn-danger" >Cancelar</button>
            </div>
          </label>

        </form>
      </div>
      <div className="signin-footer"></div>
    </div>
  )
}
