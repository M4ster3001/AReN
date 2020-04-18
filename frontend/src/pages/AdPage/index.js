/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../../helpers/olxAPI'
// eslint-disable-next-line no-unused-vars
import { Slide } from 'react-slideshow-image'
import { formatDate } from '../../helpers/format.js'

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
      const ad = json.ad[0]

      setAdInfo(ad)
      setLoading(false)
    }
    getAdInfo(idAd)
  }, [])

  return (
    <div className="container container-adpage">
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
              <div className="createdAt">
                { loading && <Loading height={ 20 } /> }
                            Criado em { adInfo.createdAt && formatDate(adInfo.createdAt) }
              </div>
              <hr />
              <br />
              <div className="descriptionAd">
                { loading && <Loading height={ 100 } /> }
                <p>Descrição</p>
                <p>{ adInfo.description && adInfo.description }</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rightSide">
          <div className="box box-padding">
            { loading && <Loading height={ 20 } /> }
          </div>
          <div className="box box-padding">
            { loading && <Loading height={ 20 } /> }
            { adInfo.value && 'R$ ' + adInfo.value.toFixed(2) }
          </div>
        </div>

      </div>
    </div>
  )
}
