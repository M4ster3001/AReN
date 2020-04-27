import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

require( 'dotenv' ).config({ path:'variables.env' });

const storageS3 = new aws.S3({
    accessKeyId: 
})

module.exports = {
    dest: path.resolve( __dirname, '..', '..', 'tmp', 'uploads' ),
    storage: multer.diskStorage({ 
        destination: (req, file, cb) => {
            cb( null, path.resolve( __dirname, '..', '..', 'tmp', 'uploads' ) )
        },
        filename: (req, file, cb) => {
            crypto.randomBytes( 16, ( err, hash ) => {
                if( err ) cb( err );

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                cb( null, fileName )
            } )
        },
    }),
    limits: {
        fileZife: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];

        if( allowedMimes.includes( file.mimetype ) ) {
            cb( null, true )
        } else {
            cb( new Error( 'Invalid file type' ) )
        }
    }
}