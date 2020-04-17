import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../helpers/olxAPI';

import './styles.css';

export default function AdPage( request ) {

    const { idAd } = useParams();
    const api = useApi();

    const [ loading, setLoading ] = useState( true );
    const [ adInfo, setAdInfo ] = useState( [] );

    return ( 
    <div className="container">
        <div className="header">Titulo</div> 
        <div className="body">

            <div className="leftSide">
                <div className="box">
                    <div className="imgAd">

                    </div>
                    <div className="infoAd">
                        <div className="nameAd">

                        </div>
                        <div className="descriptionAd">
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="rightSide">

            </div>

        </div> 
    </div> 
    );
}