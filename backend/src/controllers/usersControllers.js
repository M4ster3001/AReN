import connection from '../database/connection';
import crypto from  'crypto';
import bCrypt from  'bcrypt';
const salts = 12;
const TABLE = 'users'

module.exports = {

    async login( request, response ){
        
        let { login_email, login_password } = request.body;
        login_email = login_email.trim();

        if( !login_email || !login_password ) {
            return response.json({ error: 'Ocorreu um problema ao logar, tente novamente' });
        }
        
        try { 

            const login = await connection( TABLE ).where({ email: login_email }).select( 'idUser', 'password' ).first();

            if( !bCrypt.compareSync( login_password, login.password ) ) {
                return response.json({ error: 'Login ou senha inválidos' });
            }

            const token = crypto.randomBytes( 12 ).toString( 'HEX' );
            const query = await connection( TABLE ).where( 'idUser', login.idUser ).update({ token: token })

            if( !query ) {
                return response.json({ error: 'Ocorreu um erro no acesso código 3' });
            }

            return response.json({ token: token });

        } catch( er ) {
            return response.json( er );
        }

    }, 
    
    async index( request, response ) {

        const users = await connection( TABLE ).select( '*' );
        return response.json( users );   

    },

    async create( request, response ) {
        
        let { name, email, idState, password } = request.body;
        const flg_ativo = 1;
        const token = crypto.randomBytes( 12 ).toString( 'HEX' );

        password = bCrypt.hashSync( password, salts );
        email = email.trim();
        
        try {

            const resp = await connection( TABLE ).insert({
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

    async remove( request, response ) {

        const { idUser } = request.query;
        try{
            let query = await connection( TABLE ).where({ 'idUser': idUser }).delete().catch( ( err ) => {
                return response.json( err );
            } );
    
            if( !query ) {
                return response.json({ error: 'Usuario não localizado' })
            }
        } catch( er ){
            return response.json( er )
        }
    
        return response.status( 204 ).send();

    }

}