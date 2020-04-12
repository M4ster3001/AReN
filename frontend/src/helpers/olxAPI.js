import Cookies from 'js-cookie';
import qs from 'qs';

const BaseAPI = 'http://localhost:3333';

const apiFetchPost = async( endpoint, body ) => {

    if( !body.token ) {

        let token = Cookies.get( 'token' );
        if( token ) {
            body.token = token;
        }

    }

    const res = await fetch( BaseAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify( body ),
        
    } );

    const json = await res.json();

    if( json.notallowed ) {
        window.location.href = '/login';
        return;
    }

    return json;
}

const apiFetchGet = async( endpoint, body = [] ) => {

    if( !body.token ) {

        let token = Cookies.get( 'token' );
        if( token ) {
            body.token = token;
        }
        
    }

    const res = await fetch( `${ BaseAPI + endpoint }?${ qs.stringify( body ) }` );

    const json = await res.json();

    if( json.notallowed ) {
        window.location.href = '/login';
        return;
    }

    return json;
}

const olxAPI = {

    login:  async ( email, password ) => {
        //Consulta o webservice
        const json = await apiFetchPost( 
            '/users/login',
            { login_email: email, login_password: password }
        );
        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json;
    },

    register: async( name, stateLoc, email, password ) => {
        const json = await apiFetchPost(
            '/users/register',
            { name, idState: stateLoc, email, password }
        );
        return json;
    }

};

export default () => olxAPI;