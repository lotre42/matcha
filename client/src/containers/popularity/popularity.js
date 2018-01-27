import React, { Component } from 'react'
import Logo from '../../components/logo'
import styled from 'styled-components'
import Menu from '../../components/menu'
import Mypopularity from './my_popularity'
import {browserHistory} from 'react-router'

class Popularity extends Component {
    render () {
        if (localStorage.getItem("token")){
        return (
            <div>
                <Menu />
                <Logo />
                <Mypopularity />
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

export default Popularity