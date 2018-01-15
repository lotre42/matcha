import React, { Component } from 'react'
import Logo from '../../components/logo'
import styled from 'styled-components'
import Menu from '../../components/menu'
import Myprofil from '../../containers/profil/my_profil'

class Profil extends Component {
    render () {
        return (
            <div>
                <Menu />
                <Logo />
                <Myprofil />
            </div>
        )
    }
}

export default Profil   