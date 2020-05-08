import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview } from './styles';


export default (props) => {
    console.log( 'Fora' )
    console.log( props.files )
    console.log( props.onDelete )
    return (
        <Container>
            { props.files.map( ( uploadFile, k ) =>
                <li key={ k }>
                    <FileInfo>
                        <Preview src={ uploadFile.preview }/>
                        <div>
                            <strong>{ uploadFile.name }</strong>
                            <span>{ uploadFile.readableSize } 
                            { uploadFile.url && 
                                <button onClick={ () => props.onDelete(uploadFile.id) }> Excluir </button> 
                            }
                            </span>
                        </div>
                    </FileInfo>

                    <div>
                
                       { !uploadFile.uploaded && !uploadFile.error && 
                        <CircularProgressbar
                            styles={{
                                root: { width: 35 },
                                path: { stroke: '#7159c1' },
                            }}
                            strokeWidth={ 10 }
                            value={ uploadFile.progress }
                            text={ uploadFile.progress }
                        /> 
                    }

                    { uploadFile.url && 
                        <a
                            href={ uploadFile.url }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdLink style={{ marginRight: 10, marginLeft: 5 }} size={ 24 } color="#222" />
                        </a> 
                    }
                    
                    { uploadFile.uploaded && <MdCheckCircle style={{ marginLeft: 10 }} size={24} color="#78e5d5" /> }
                    { uploadFile.error && <MdError style={{ marginLeft: 10 }} size={24} color="#e57878" /> }
                        
                    </div>
                        
                </li>
            ) }
        </Container>
    );
};
