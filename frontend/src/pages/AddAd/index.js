/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import useAPI from '../../helpers/API'
import axiosAPI from '../../helpers/axiosAPI'

import { uniqueId } from 'lodash'
import filesize from 'filesize'

import Dropzone from 'react-dropzone'

import FileList from '../../components/partials/FileList'

import './styles.css'
import { DropContainer, Container, Content, UploadMessage, Teste } from './styled'
import fileSize from 'filesize'

export default function AddAd () {
  const api = useAPI()

  const [ idAd, setIdAd ] = useState( 0 );
  const [ title, setTitle ] = useState( '' );
  const [ category, setCategory ] = useState( '' );
  const [ price, setPrice ] = useState( '' );
  const [ description, setDescription ] = useState( '' );
  const [ resume, setResume ] = useState( '' );

  const fileField = useRef();
  const history = useHistory();

  const [ images, setImages ] = useState( [] );
  const [ categoryList, setCategoryList ] = useState( [] );

  const [ uploadedFiles, setUploadedFiles ] = useState( [] );

  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')

  //Loading categories
  useEffect( () => {
    const getCategories = async() => {
      const slist  = await api.getCategories()
      setCategoryList(slist)
    }

    const getFiles = async() => {
      const fList = await api.getFilesList()
      setUploadedFiles( uploadedFiles => fList.data.map( file =>({
        id: file.idImgGal,
        name: file.subtitle,
        readablesize: fileSize( file.size ),
        preview: file.url,
        uploaded: true,
        url: file.url
      }) ) 
      );
    }

    getCategories()
    
  }, []);
  
  const handleUpload = async (files) => {
    
    const fs = await files.map( file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize( file.size ),
      preview: URL.createObjectURL( file ),
      progress: 0,
      uploaded: false,
      error: false,
      url: null

    }) )

    setUploadedFiles( uploadedFiles => ([ ...uploadedFiles,  ...fs ]) )

    //uploadedFiles.forEach( processUpload )

  };

  async function processUpload( teste, uploadedFile ) {

    const data = new FormData();

    data.append( 'idAd', idAd )
    data.append( 'file', uploadedFile.file, uploadedFile.name );

    await axiosAPI.post( '/ad/gallery/register', data, {
      onUploadProgress: e => {
        const progress = parseInt( Math.round( ( e.loaded * 100 ) / e.total ) )
        //console.log( progress )
        updateFile( uploadedFile.id, { progress } )
      }
    }).then( response => {
      updateFile( uploadedFile.id, {
        uploaded: true,
        id: response.data.id[0],
        url: response.data.url
      } ) 
    }).catch( () => {
      updateFile( uploadedFile.id, {
        error: true
      } ) 
    });

  }
  
  function updateFile( id, data ) {

    setUploadedFiles( uploadedFiles => uploadedFiles.map( uploadedFile => {
      return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile ; 
    } ))
  }

  async function handleDelete(id) {
    
    axiosAPI.delete(`/ad/gallery/delete/${id}` )

    setUploadedFiles( uploadedFiles => uploadedFiles.filter( file => file.id != id ) )
  }
   
  //Submit form
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

        const json = await api.AddAd( fData );
        if( !json.error ) {
          
          setIdAd( json.id )

          uploadedFiles.forEach( processUpload )

          uploadedFiles( uploadedFiles => this.forEach(file => URL.revokeObjectURL( file.preview ) ) );
          //history.push(`/ad/view/${json.id}`);
          return;
        } else {
          setError( json.error );
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

  let renderDragMessage = ( isDragActive, isDragReject ) => {

    if( !isDragActive ) {
      return <UploadMessage>Arraste os arquivos aqui ...</UploadMessage>
    }

    if( isDragReject ) {
      return <UploadMessage type="error" >Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>

  }

  return (
    <div className="container">
      <div className="header">Novo anúncio</div>
      { error &&
        <div className="error-message">{ error }</div>
      }
      <div className="body">

        <form className="form-noimg form-cadastro" onSubmit={ handleSubmit }>

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
              <Dropzone accept="image/*" onDropAccepted={handleUpload}>
              { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <DropContainer 
                  { ...getRootProps() }
                  isDragActive={ isDragActive }
                  isDragReject={ isDragReject }
                >
                  <input {...getInputProps()} />
                  { renderDragMessage( isDragActive, isDragReject ) }

                </DropContainer>
              ) }

             </Dropzone>

             </div>
          </label>

          <label htmlFor="" className="area">
              <div className="area--title"></div>
              { !!uploadedFiles.length && <FileList files={uploadedFiles} onDelete={handleDelete} /> }
            
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
