import React, { useState, useEffect } from 'react'
import useAPI from '../../helpers/API'
import { Link } from 'react-router-dom'

import AdItem from '../../components/partials/AdItem'

import './styles.css'

export default function Login () {
  const api = useAPI()

  const PATH_ICONS = 'http://localhost:3000/assets/img/icons/'

  const [stateList, setStateList] = useState([])
  const [categories, setCategories] = useState([])
  const [adList, setAdList] = useState([])

  const getStates = async () => {
    const sList = await api.getStates()
    setStateList(sList)
  }

  const getCategories = async () => {
    const sList = await api.getCategories()
    setCategories(sList)
  }
  const getRecentAds = async () => {
    const json = await api.getAds({
      sort: 'desc',
      limit: 8,
      flg_ativo: 1
    })
    setAdList(json)
  }

  useEffect(() => {
    async function LoadData() {
      await Promise.all([getStates(), getCategories(), getRecentAds()])
    }
    
    LoadData()
  }, [])

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
                { stateList.map((i, k) =>
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
          { categories.map((i, k) =>
            <Link key={ k } to={`/ads?cat=${i.slugCategory}`} className="categoryItem">
              <img src={ PATH_ICONS + i.imgCategory } alt="" />
              <span>{ i.nameCategory }</span>
            </Link>
          )}
        </div>
      </div>

      <div className="container container-recents">
        <div className="header">Anuncios Recentes</div>
        <div className="body">
          <div className="list">
            { adList.map((i, k) =>
              <AdItem key={ k } data={ i } />
            )}
          </div>
          <Link to="/ads" className="seeAllLinks">Ver todos</Link>
          
        </div>
      </div>
      
    </div>

  )
}
