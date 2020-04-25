/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import useAPI from '../../helpers/olxAPI'

import './styles.css'

export default function AddAd () {
  const api = useAPI()

  const [ title, setTitle ] = useState( '' );
  const [ category, setCategory ] = useState( '' );
  const [ price, setPrice ] = useState( '' );
  const [ description, setDescription ] = useState( '' );
  const [ resume, setResume ] = useState( '' );

  const fileField = useRef();
  const history = useHistory();

  const [ categoryList, setCategoryList ] = useState( [] );

  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')

  useEffect( () => {
    const getCategories = async() => {
      const slist  = await api.getCategories()
      setCategoryList(slist)
    }

    getCategories()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    //setDisabled( true );
    setError( '' );
    let errors = [];

    if( !title.trim() ) {
      errors.push( 'Sem título' );
    }

    if( !category ){
      errors.push( 'Sem categoria' );
    }

    if( errors.length === 0 ){

        const fData = new FormData();
        fData.append( 'title', title )
        fData.append( 'idCategory', category )
        fData.append( 'resume', resume )
        fData.append( 'description', description )
        fData.append( 'price', price )

        if( fileField.current.files.length > 0 ) {

          for( let i = 0; i<fileField.current.files.length; i++ ){
            fData.append( 'img', fileField.current.files[i] )
          }

        }

        const json = await api.AddAd( fData );
        if( !json.error ) {
          //history.push(`/ad/view/${json.id}`);
          return;
        }

    } else {
      setError( errors.join("\n") );
    }

    //setDisabled( false );
  }

  const priceMask = createNumberMask({
    prefix: 'R$',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ','
  })

  return (
    <div className="container">
      <div className="header">Novo anúncio</div>
      { error &&
        <div className="error-message">{ error }</div>
      }
      <div className="body">

        <form className="form-noimg form-cadastro" enctype="multipart/form-data" onSubmit={ handleSubmit }>

          <label htmlFor="" className="area">
            <div className="area--title">Título</div>
            <div className="area--input">
              <input type="text" id="title" name="title" value={ title } onChange={ e => setTitle(e.target.value) } disabled={ disabled } required/>
            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title">Categoria</div>
            <div className="area--input">
              <select value={ category } id="category" onChange={ e => setCategory(e.target.value) } disabled={ disabled } required >
                <option></option>
                { categoryList && categoryList.map((i, k) =>
                  <option key={ k } value={ i.idCategory }>{ i.nameCategory }</option>
                ) }
              </select>
            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title">Resumo</div>
            <div className="area--input">
              <textarea type="text" id="resume" name="resume" value={ resume } onChange={ e => setResume(e.target.value) } disabled={ disabled } required ></textarea>
            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title">Descrição</div>
            <div className="area--input">
              <textarea id="description" name="description" value={ description } onChange={ e => setDescription(e.target.value) } disabled={ disabled } ></textarea>
            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title">Preço</div>
            <div className="area--input">
              <MaskedInput mask={priceMask} placeholder="R$" value={ price } onChange={ e => setPrice(e.target.value) } disabled={ disabled } required/>
            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title">Fotos do produto</div>
            <div className="area--input">
              <input type="file" id="photos" name="photos" ref={fileField} disabled={ disabled } multiple/>
            </div>
          </label>

          <label htmlFor="" className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button className="btn btn-success" disabled={ disabled } >Postar</button>
              <button className="btn btn-danger" >Cancelar</button>
            </div>
          </label>

        </form>
      </div>
    </div>
  )
}
