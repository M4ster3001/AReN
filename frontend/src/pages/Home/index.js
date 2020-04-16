import React, { useState, useEffect } from 'react';
import useAPI from '../../helpers/olxAPI';
import { Link } from 'react-router-dom';

import './styles.css'; 

export default function Login() {

    const api = useAPI();
    
    const PATH_IMG = 'http://localhost:3000/assets/img/';

    const [ stateList, setStateList ] = useState( [] );
    const [ categories, setCategories ] = useState( [] );

    useEffect( () => {
        const getStates = async() => {
            const sList = await api.getStates();
            setStateList( sList );
        }

        getStates();
    }, [] );

    useEffect( () => {
        const getCategories = async() => {
            const sList = await api.getCategories();
            setCategories( sList );
        }

        getCategories();
    }, [] );

    return (

        <div>
            <div className="container container-search">
                <div className="header"></div>
                <div className="body">                                        
                    <div className="home-search">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="Digite o que deseja procurar" />
                            <select name="state" id="state">
                                <option></option>
                                { stateList.map( ( i, k ) => 
                                    <option key={ k } value={ i.idState }>{ i.ufState }</option>
                                ) } 
                            </select>
                            <button className="btn btn-search">Pesquisar</button>
                        </form>
                    </div>
                    <div className="home-categorys">
                        
                    </div>
                </div>        
            </div>
            <div className="container container-categorys">
                <div className="header"></div>
                <div className="body">                                        
                    { categories.map( ( i, k ) => 
                        <Link key={ k } to={`/ads?cat=${ i.slug }`} className="categoryItem">                                
                            <img src={ PATH_IMG + i.imgCategory } alt="" />
                            <span>{ i.nameCategory }</span>
                        </Link>
                    )}
                </div>       
            </div>
        </div>
        
    );

}