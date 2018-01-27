import React, { Component } from 'react'
import { connect } from 'react-redux'
import { verif } from '../actions/user'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'


class Verifemail extends Component {
    render () {
        if (this.props.location.query.token == localStorage.getItem('verif'))
            this.props.verif();
        return (<div>{browserHistory.push('/connexion')}</div>)
    }
}
function mapStateToProps(state){
    return{
       users: state.userss,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({verif}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Verifemail)