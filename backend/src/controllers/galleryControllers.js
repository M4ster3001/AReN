require( 'dotenv' ).config({ path: 'variables.env' })

import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

import aws from 'aws-sdk'
const s3 = new aws.S3()

import connection from '../database/connection';

const TABLE = 'images_gallery'

export async function index(request, response) {

    const { order = 'asc', limit = -1, idAd = null } = request.query;
    let query = '';

    if( !idAd ) {
        query = await connection(TABLE).select('*').orderBy('createdAt', order).limit(limit);
    } else {
        query = await connection(TABLE).where( 'idAd', idAd ).select('*').orderBy('createdAt', order).limit(limit);
    }

    return response.json(query);

}

export async function create(req, res) {
    let{ originalname: name, size, key, location: url = "" } = req.file
    const { idAd } = req.body
    
    if( !url ) {
        url = ( process.env.NODE_DEV == 'DEV' ? process.env.PATH_LOCAL + name : '' ) 
    }

    try{
        resp = await connection('images_gallery').insert({
            idAd,
            subtitle: name,
            size,
            key,
            url
        });

        if( !resp ) {
            return res.json({ error: 'Não foi possível salvar' })
        }

    } catch( er ){
        return res.json( er )
    }

    return res.status( 200 ).json(resp);
}

export async function update(request, response) {

    let{ idAd, originalname: name, size, key, location: url = "" } = req.file
    let resp;

    if( !url ) {
        url = ( process.env.NODE_DEV == 'DEV' ? process.env.PATH_LOCAL + name : '' ) 
    }

    try{
        resp = await connection(TABLE).where('idImgGal', idImgGal).update({
            idAd,
            subtitle: name,
            size,
            key,
            url
        });

        if( !resp ) {
            return response.json({ error: 'Não foi possível alterar' })
        }

    } catch( er ){
        return response.json( er )
    }

    return response.status( 200 ).json(resp);
}

export async function Delete(request, response) {

    const { idImgGal } = request.body;
    try{

        let query = await connection( TABLE ).where({ 'idImgGal': idImgGal }).first().catch( ( err ) => {
            return response.json( err );
        } );

        let delete_file = '';
        if( process.env.STORAGE_TYPE === 's3' && query.key ){

            delete_file = s3.deleteObject({
                Bucket: process.env.BUCKET,
                Key: query.key
            }).promise()

        } else if( process.env.STORAGE_TYPE === 'local' && query.key ){

            promisify( fs.unlink )( path.resolve( __dirname, '..', '..', 'tmp', 'uploads', query.key ) )

        }

        let erase = await connection( TABLE ).where({ 'idImgGal': idImgGal }).delete().catch( ( err ) => {
            return response.json( err );
        } );

        if( !erase ) {
            return response.status( 404 ).json({ error: 'Imagem não localizada' })
        }

    } catch( er ){
        return response.json( er )
    }

    return response.status( 204 ).send();

    
}