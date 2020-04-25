import express from 'express'
import router from './src/routes'
import bodyParse from 'body-parser'

require( 'dotenv' ).config({ path: 'variables.env' });

const app = express();
app.use( bodyParse.json() ) 
app.use( bodyParse.urlencoded({ urlencoded: true, extended: true }) ) 

export default app;