import React, { useState } from 'react';

import './styles.css';

import logoImg from '../../img/logo.jpg'

export default function Login() {

    const [ email, setEmail ] = useState( '' );  
    const [ password, setPassword ] = useState( '' );  
    const [ flg_logado, setLogado ] = useState( '' );  
    const [ disabled, setDisabled ] = useState( false );

    async function handleLogar( e ) {
        e.preventDefault();
        setDisabled( true );

        
    }

    return (
        <div className="container">
            <div className="signin-header">Login</div>
                <div className="signin-body">     
                          
                    <div className="logo-img">
                        <img src={ logoImg } alt="login-olx-fake" />
                    </div>

                    <form className="form-login" onSubmit={ handleLogar }>

                        <label htmlFor="" className="area">
                            <div className="area--title">E-mail</div>
                            <div className="area--input">
                                <input type="email" id="email" name="email" value={ email } onChange={ e => setEmail( e.target.value ) } disabled={ disabled } required/>                          
                            </div>
                        </label>

                        <label htmlFor="" className="area">
                            <div className="area--title">Senha</div>
                            <div className="area--input">
                                <input type="password" id="senha" name="senha" value={ password } onChange={ e => setPassword( e.target.value ) } disabled={ disabled } required/>
                                
                            </div>
                        </label>

                        <label htmlFor="" className="area">
                            <div className="area--title">Lembra senha?</div>
                            <div className="area--input">
                                <input type="checkbox" id="flg_logado" name="flg_logado" value={ flg_logado } onChange={ e => setLogado( e.target.value ) } disabled={ disabled } />                          
                            </div>
                        </label>

                        <label htmlFor="" className="area">
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button className="btn btn-success"  disabled={ disabled } >Entrar</button>
                            </div>
                        </label>

                    

                    </form>
                </div>    
            <div className="signin-footer"></div>       
        </div>
    );
}