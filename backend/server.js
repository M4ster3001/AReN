require( 'dotenv' ).config({ path: 'variables.env' })

import app from './app'

app.set( 'port', process.env.PORT || 3333 );

if( app.listen() ){
    let server = app.listen();
    server.close();
}

const server = app.listen( app.get( 'port' ), () => { console.log( `Servidor rodando na porta: ${ app.get('port') }` ) } )
