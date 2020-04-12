const connection = require( '../database/connection' );
const crypto = require( 'crypto' );

module.exports = {

    async login( request, response ){
        
        const { login_email, login_password } = request.body;

        if( !login_email || !login_password ) {
            return response.json({ error: 'Ocorreu um problema ao logar, tente novamente' });
        }
        
        try { 

            const login = await connection( 'users' ).where({ email: login_email, password: login_password }).select( 'idUser' ).first();

            if( !login ) {
                return response.json({ error: 'Login ou senha inválidos' });
            }

            const token = crypto.randomBytes( 10 ).toString( 'HEX' );
            return response.json({ token: token });

        } catch( er ) {
            return response.json( er );
        }

    }, 
    
    async index( request, response ) {

        const users = await connection( 'users' ).select( '*' );
        return response.json( users );   

    },

    async create( request, response ) {
        
        const { name, email, idState, password } = request.body;
        const flg_ativo = 1;
        const token = crypto.randomBytes( 10 ).toString( 'HEX' );

        try {

            const resp = await connection( 'users' ).insert({
                name,
                email,
                idState,
                password,
                token,
                flg_ativo
            });

        } catch( er ) {
            return response.json( er );
        }

        return response.json( token );
    },

    async update() {

    },

    async delete( request, response ) {

        const { idUser } = request.query;
        const user_id = await connection( 'users' ).where( 'idUser', id ).select( 'idUser' ).first();

        if( !user_id )
        {
            return response.status( 401 ).json({ erro: 'Usuário não encontrado' });
        }

        await connection( 'users' ).where( 'idUser', id ).delete();
        return response.status( 204 ).send();
    }

}