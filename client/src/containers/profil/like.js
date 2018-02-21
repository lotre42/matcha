import React, { Component } from 'react'
import styled, { keyframes } from "styled-components"
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import {likeUser, checkLike} from '../../actions/search'

const Button = styled.button`
border: none;
outline: 0;
display: inline-block;
padding: 8px;
color: white;
background-color: ${props => props.rose ? 'rgb(205, 111, 190)' : 'rgb(87,141,210)'};
text-align: center;
cursor: pointer;
width: 100%;
font-size: 18px;
:hover {
    background-color: ${props => props.rose ? 'rgb(87,141,210))' : 'rgb(205, 111, 190)'};
    }
`;

class Like extends Component {
    render () {
        function Empty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        if (Empty(this.props.infolike))
            this.props.checkLike(this.props.profil.info.id)
        return (
                <p><Button onClick={e => this.props.likeUser(this.props.profil.info.id, this.props.infolike)} rose>{this.props.infolike.like}</Button></p>
        )
    }
}

function mapStateToProps(state){
    return{
        infolike: state.infolike,
        profil: state.profil,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({likeUser, checkLike}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Like)