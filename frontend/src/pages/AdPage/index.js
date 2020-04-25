/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useApi from '../../helpers/olxAPI'

// eslint-disable-next-line no-unused-vars
import { Slide } from 'react-slideshow-image'
import { formatDate } from '../../helpers/format.js'

import AdItem from '../../components/partials/AdItem'
import Loading from '../../components/partials/Loading'

import './styles.css'

export default function AdPage (request) {
  
  const { idAd } = useParams()

  const api = useApi()

  const PATH_ADS = 'http://localhost:3000/assets/img/'

  const [loading, setLoading] = useState(true)
  const [adInfo, setAdInfo] = useState({})

  useEffect(() => {
    const getAdInfo = async (idAd) => {
      const json = await api.getAd(idAd, true)
      let ad = json.ad[0]

      ad['others'] = json.others

      setAdInfo(ad)
      setLoading(false)
    }

    getAdInfo(idAd)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    
  }, [idAd])

  return (
    <div className="container container-adpage">

      <div className="box box-padding BreadChumb">
        Você está aqui:
        <Link to="/">Home</Link>
        /
        { adInfo.userInfo && <Link to={ `/ads?state=${adInfo.userInfo.ufState}` }>{ adInfo.userInfo.ufState }</Link> }
        /
        { adInfo.category && <Link to={ `/ads?state=${adInfo.userInfo.ufState}&cat=${adInfo.category.slugCategory}` }>{ adInfo.category.nameCategory }</Link> }
        / { adInfo.title }
      </div>

      <div className="header">
        { loading && <Loading height={ 20 } /> }
        { adInfo.title && adInfo.title }
      </div>

      <div className="body">
        <div className="leftSide">
          <div className="box">
            <div className="imgAd">
              { loading && <Loading height={ 300 } /> }
              { adInfo.gallery &&
                <Slide>
                  { adInfo.gallery.map((img, k) =>
                    <div key={ k } className="each-slide" >
                      <img src={ PATH_ADS + img.imgAd } alt="" />
                    </div>
                  ) }
                </Slide>
              }

            </div>
            <div className="infoAd">
              <div className="createdAt help-block">
                { loading && <Loading height={ 20 } /> }
                            Criado em { adInfo.createdAt && formatDate(adInfo.createdAt) }
              </div>
              <hr />
              <br />
              <div className="descriptionAd">
                { loading && <Loading height={ 100 } /> }
                <p className="title">Descrição</p>
                <p>{ adInfo.description && adInfo.description }</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rightSide">
          <div className="box box-padding">
            { loading && <Loading height={ 20 } /> }
            <span className="price-item">Preço: <strong>{ adInfo.value && 'R$ ' + adInfo.value.toFixed(2) }</strong></span>
          </div>
          { loading && <Loading height={ 20 } /> }
          { adInfo.userInfo &&
            <>
              <a href={`mailto:${adInfo.userInfo.email}`} rel="noopener noreferrer" target="_blank" className="contactSellerLink" > Contate o vendedor </a>
              <div className="box box-padding createdBy">
                <strong>{ adInfo.userInfo.name }</strong>
                <small>{ adInfo.userInfo.email }</small>
                <small>{ adInfo.userInfo.ufState }</small>
              </div>
            </>
          }
        </div>

        
      </div>
      { adInfo.others &&
        <div className="container container-recents">
          <div className="header">Outros anuncios do vendedor</div>
          <div className="body">
            <div className="list">
              { adInfo.others.map((i, k) =>
                <AdItem key={ k } data={ i } />
              )}
            </div>
          </div>
        </div>
        }
    </div>
  )
}
