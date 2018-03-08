import React, { Component } from 'react'
import Register from './register'
import Logo from '../../components/logo'
import Sign from '../../components/sign_in'
import Forget from '../../components/forget'
import styled from 'styled-components'

class Home extends Component {
    render () {
        return (
            <div>
            <Logo/>
            <Sign/>
            <Register/>
            <Forget/>            
            </div>
        )
    }
}

export default Home