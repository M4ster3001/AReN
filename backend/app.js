import express from 'express'
import router from './src/routes'
import bodyParse from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

require( 'dotenv' ).config({ path: 'variables.env' });

const app = express();
app.use( cors() )
app.use( bodyParse.json() ) 
app.use( bodyParse.urlencoded({ urlencoded: true, extended: true }) ) 
app.use( morgan('dev') )

if( !fs.existsSync( './tmp/uploads' ) ) {
    fs.mkdirSync( './tmp/uploads' )
}

app.use( '/files', express.static( path.resolve( __dirname, ".", "tmp", "uploads" ) ) )

app.use( '/', router )

export default app;