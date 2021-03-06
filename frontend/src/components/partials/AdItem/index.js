import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

export default (props) => {
  const PATH_ADS = 'http://localhost:3000/assets/img/'
  let price = 0

  price = parseFloat(props.data.value).toFixed(2)

  return (
    <div className="aditem">
      <Link to={`/ad/view/${props.data.idAd}`}>
        <div className="imgItem">
          <img src={ PATH_ADS + props.data.imgAd } />
        </div>
        <div className="nameItem">{ props.data.title }</div>
        <div className="valItem"> R$ { price }</div>
      </Link>
    </div>
  )
}
