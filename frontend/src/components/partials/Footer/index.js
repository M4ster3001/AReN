import React from 'react'

import './styles.css'

export default function Footer () {
  return (
    <div className="container">
      <div className="footer">
        <label htmlFor="" className="label-copyright"> COPYRIGHT { new Date().getFullYear() }</label>
      </div>
    </div>
  )
};
