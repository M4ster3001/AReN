const connection = require( '../database/connection' );

module.exports = 
{
    async select( request, response ) {

        const { table, data = [], filter = [], select = '*', orderColumn = 'createdAt', orderDir = 'ASC', limit = -1 } = request;
        let query = '';

        try{

            if( data ) {

                if( filter ) {

                    if( filter.type === 'notEqual' ){
                        response = await connection( table ).where( data ).whereNot( filter.data ).select( select ).limit( limit ).orderBy( orderColumn, orderDir );
                    } else if( filter.type === 'others' ){
                        response = await connection( table ).where( data ).andWhere( filter.column, filter.condition, filter.value ).select( select ).limit( limit ).orderBy( orderColumn, orderDir );
                    } else {
                        response = await connection( table ).where( data ).select( select ).limit( limit ).orderBy( orderColumn, orderDir );
                    }

                } else {
                    response = await connection( table ).where( data ).select( select ).limit( limit ).orderBy( orderColumn, orderDir );
                }

            } else {
                
                if( filter ) {

                    if( filter.type === 'notEqual' ){
                        response = await connection( table ).whereNot( filter.data ).select( select ).limit( limit ).orderBy( orderColumn, orderDir );
                    } else if( filter.type === 'others' ){
                        response = await connection( table ).andWhere( filter.column, filter.condition, filter.value ).select( select ).limit( limit ).orderBy( orderColumn, orderDir );
                    } else {
                        response = await connection( table ).select( select ).limit( limit ).orderBy( orderColumn, orderDir );
                    }

                } else {
                    response = await connection( table ).select( select ).limit( limit ).orderBy( order );
                }               

            }

        } catch( er ) {
            return { 'error': er };
        }
        console.log( response );
        return response;
        
    },

    async quantity( request, response ) {
        const { table, column, nameCount = 'qtde' } = request;

        try{
            return await connection( table ).count( column, { as : nameCount } );
        }catch(er){
            return { 'error': er };
        }
    },

    async sum( request, response ) {
        const { table, column, nameCount = 'qtde' } = request;

        try{
            return await connection( table ).sum( column, { as : nameCount } );
        }catch(er){
            return { 'error': er };
        }
    },

    async insert( request, response ) {

        const { table, data } = request;
        let resp; 

        try {

            resp = await connection( table ).insert( data );

        } catch( er ) {
            return response.json( er );
        }

        return response.json( resp );
    },

    async update( request, response ) {
        
        const { table, select, data } = request;
        let resp;
        try
        {

            resp = await connection( table ).where( select ).update( data );
            
        }catch( er ) 
        {
            return response.json( er );
        }

        return response.json( resp );
    },

    async delete( request, response ) {}

}