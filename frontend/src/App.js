import React from 'react';
import { connect } from 'react-redux';

const Page = ( props ) => {
    return( <div>Olá mundo</div> ); 
}

const mapStateToProps = ( state ) => {
    return { user: state.user };
}

export default connect( mapStateToProps, mapDispatchToProps )( Page );