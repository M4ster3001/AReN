import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import aws from 'aws-sdk';

import connection from '../database/connection';

require('dotenv').config({ path: 'variables.env' });

const s3 = new aws.S3();

const TABLE = 'images_gallery';

export async function index(request, response) {
  const { order = 'asc', limit = -1, idAd = null } = request.query;
  let query = '';

  if (!idAd) {
    query = await connection(TABLE)
      .select('*')
      .orderBy('createdAt', order)
      .limit(limit);
  } else {
    query = await connection(TABLE)
      .where('idAd', idAd)
      .select('*')
      .orderBy('createdAt', order)
      .limit(limit);
  }

  return response.json(query);
}

export async function create(req, res) {
  let { originalname: name, size, key, location: url = '' } = req.file;
  const { idAd } = req.body;

  if (!url) {
    url = process.env.NODE_DEV == 'DEV' ? process.env.PATH_LOCAL + key : '';
  }
  let data = [];

  data = { url };
  // console.log( data )
  try {
    await connection('images_gallery')
      .insert({
        idAd,
        subtitle: name,
        size,
        key,
        url,
      })
      .then(resp => {
        data.id = resp;
        return res.status(200).json(data);
      })
      .catch(err => {
        return res.status(400).json(err);
      });
  } catch (er) {
    console.log(er);
  }
}

export async function update(request, response) {
  let { originalname: name, size, key, location: url = '' } = request.file;
  const { idImgGal, idAd } = request.body;
  let resp;

  if (!url) {
    url = process.env.NODE_DEV == 'DEV' ? process.env.PATH_LOCAL + key : '';
  }

  try {
    resp = await connection(TABLE).where('idImgGal', idImgGal).update({
      idAd,
      subtitle: name,
      size,
      key,
      url,
    });

    if (!resp) {
      return response.json({ error: 'Não foi possível alterar' });
    }
  } catch (er) {
    return response.json(er);
  }

  return response.status(200).json(resp);
}

export async function Delete(req, response) {
  const { id } = req.params;
  let query = [];

  try {
    if (id > 0 && id !== ':id') {
      query[0] = await connection(TABLE)
        .where({ idImgGal: id })
        .first()
        .catch(err => {
          return response.json(err);
        });
    } else {
      query = await connection(TABLE).catch(err => {
        return response.json(err);
      });
    }

    let erase;
    let delete_file = '';

    if (query) {
      query.forEach(async element => {
        delete_file = '';
        if (process.env.STORAGE_TYPE === 's3' && element.key) {
          delete_file = s3
            .deleteObject({
              Bucket: process.env.BUCKET,
              Key: element.key,
            })
            .promise();
        } else if (process.env.STORAGE_TYPE === 'local' && element.key) {
          promisify(fs.unlink)(
            path.resolve(__dirname, '..', '..', 'tmp', 'uploads', element.key),
          );
        }

        erase = await connection(TABLE)
          .where({ idImgGal: element.idImgGal })
          .delete();

        if (!erase) {
          return response.status(404).json({ error: 'Imagem não localizada' });
        }
      });
    }
  } catch (er) {
    return response.json(er);
  }

  return response.status(204).send();
}
