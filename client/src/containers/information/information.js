import React, { Component } from 'react'
import Info from './info'
import Logo from '../../components/logo'
import Img from './Img'
import Loc from '../loc'
import styled from 'styled-components'
import Menu from '../../components/menu'
import {browserHistory} from 'react-router'


const PhotoTag = styled.div`
width: 85%;
display: flex;
justify-content: space-between;
`;
const Titre = styled.div`
width: 81%;
display: flex;
justify-content: space-between;
`;
const H2= styled.h2`
color: rgb(87,141,210);
`;

class Information extends Component {
    render () {
        if (localStorage.getItem("token")){
            return (
                <div>
                    <Menu />
                    <Logo/>
                    <Info/>
                    <Img/>
                    <Loc />
                </div>
            )
        }
        else{
            return(
                <div>{browserHistory.push('/')}</div>
            )
        }
    }
}

export default Information