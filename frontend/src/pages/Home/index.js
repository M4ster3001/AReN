import React from 'react';
import useAPI from '../../helpers/olxAPI';

import './styles.css';

export default function Login() {

    const api = useAPI();

    return (

        <div>
            <div className="container container-search">
                <div className="home-header"></div>
                <div className="home-body">                                        
                    <div className="home-search">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="Digite o que deseja procurar" />
                            <select name="state" id="state">
                                <option>SP</option>
                            </select>
                            <button className="btn btn-search">Pesquisar</button>
                        </form>
                    </div>
                    <div className="home-categorys">

                    </div>
                </div>    
                <div className="home-footer"></div>       
            </div>

            <div className="container">
                <div className="home-header"></div>
                    <div className="home-body">                                        
                    
                    </div>    
                <div className="home-footer"></div>       
            </div>
        </div>
        
    );

}