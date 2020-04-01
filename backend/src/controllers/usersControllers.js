const connection = require( '../database/connection' );
const crypto = require( 'crypto' );

module.exports = {

    async index( request, response ) {

        const users = await connection( 'users' ).select( '*' );
        return response.json( users );   

    },

    async create( request, response ) {
        
        const { email, password } = request.body;
        const flg_ativo = 1;
        const token = crypto.randomBytes( 10 ).toString( 'HEX' );

        const resp = await connection( 'users' ).insert({
            email,
            password,
            token,
            flg_ativo
        });

        return response.json( resp )
    },

    async delete( request, response ) {

        const { id } = request.query;
        const user_id = await connection( 'users' ).where( 'id', id ).select( 'id' ).first();

        if( !user_id )
        {
            return response.status( 401 ).json({ erro: 'Usuário não encontrado' });
        }

        await connection( 'users' ).where( 'id', id ).delete();
        return response.status( 204 ).send();
    }

}