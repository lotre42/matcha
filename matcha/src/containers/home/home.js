import React, { Component } from 'react'
import Register from './register'
import Logo from '../../components/logo'
import Sign from '../../components/sign_in'
import styled from 'styled-components'

class Home extends Component {
    render () {
        return (
            <div>
            <Logo/>
            <Register/>
            <Sign/>
            </div>
        )
    }
}

export default Home