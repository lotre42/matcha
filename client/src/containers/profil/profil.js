import React, { Component } from 'react'
import Infoprofil from './infoprofil';
import Logo from '../../components/logo'
import Menu from '../../components/menu'
import styled from 'styled-components'
import {browserHistory} from 'react-router'


class Profil extends Component {
    render () {
        if (localStorage.getItem("token")){
        return (
            <div>
                <Menu />
                <Logo />
                <Infoprofil />
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

export default Profil