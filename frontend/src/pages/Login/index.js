import React, { useState } from 'react';
import useAPI from '../../helpers/olxAPI';
import { doLogin } from '../../helpers/authHandler';

import './styles.css';

import logoImg from '../../img/logo.jpg'

export default function Login() {

    const api = useAPI();

    const [ email, setEmail ] = useState( '' );  
    const [ password, setPassword ] = useState( '' );  
    const [ flg_logado, setLogado ] = useState( false );  
    const [ disabled, setDisabled ] = useState( false );
    const [ error, setError ] = useState( '' );

    async function handleLogar( e ) {
        e.preventDefault();
        setDisabled( true );
        
        try {
            const json = await api.login( email, password );
            if( json.error ) {
                setError( json.error );
            } else {
                doLogin( json.token, flg_logado );
                window.location.href = '/';
            }
        } catch ( er ) {
            alert( 'Erro: ' + er );
            
        }
        
        setDisabled( false );
    }

    return (
        <div className="container">
            <div className="signin-header">Login</div>
                { error && 
                    <div className="error-message">{ error }</div>
                }
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
                                <input type="checkbox" id="flg_logado" name="flg_logado" checked={ flg_logado } onChange={ () => setLogado( !flg_logado ) } disabled={ disabled } />                          
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