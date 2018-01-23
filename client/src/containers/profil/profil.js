import React, { Component } from 'react'
import Infoprofil from './infoprofil';
import Logo from '../../components/logo'
import Menu from '../../components/menu'
import styled from 'styled-components'

class Profil extends Component {
    render () {
        return (
            <div>
                <Menu />
                <Logo />
                <Infoprofil />
            </div>
        )
    }
}

export default Profil