import React, { Component } from 'react'
import Logo from '../../components/logo'
import styled from 'styled-components'
import Menu from '../../components/menu'
import Mypopularity from './my_popularity'

class Popularity extends Component {
    render () {
        return (
            <div>
                <Menu />
                <Logo />
                <Mypopularity />
            </div>
        )
    }
}

export default Popularity