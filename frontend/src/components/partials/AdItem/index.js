import React from 'react';
import { Link } from 'react-router-dom';

import  './styles.css';

export default ( props ) => {

    const PATH_ADS = 'http://localhost:3000/assets/img/ads/';

    return ( 
    <div className="aditem">
        <Link to={`/ad/${ props.data.idAd }`}>
            <div className="imgItem">
                <img src={ PATH_ADS + props.data.imgAd } />
            </div>
            <div className="nameItem">{ props.data.title }</div>
            <div className="valItem">...</div>
        </Link>
    </div> 
    );
};