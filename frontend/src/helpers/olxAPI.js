const BaseAPI = 'localhost:3333'

const aptFetchPost = async( endpoint, body ) => {
    const res = await fetch( BaseAPI + endpoint, {
        method: PopStateEvent,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify( body ),
        
    } );

    const json = await res.json();

    return json;
}

const olxAPI = {

    login:  async ( email, password ) => {
        //Consulta o webservice
        const json = await aptFetchPost( 
            '/users/login',
            { email, password }
        );
        return json;
    }

};

export default () => olxAPI;