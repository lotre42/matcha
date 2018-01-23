import React, { Component } from 'react'
import Bar from './bar_message'
import Conversation from './conversation'
import Logo from '../../components/logo'
import Menu from '../../components/menu'
import styled from 'styled-components'

const DIV = styled.div`
display: flex;
width: 100%;
`;
const H3= styled.h3`
color: rgb(87,141,210);
font-family: Mothproofscriptregular;
`;
class Message extends Component {
    render () {
        return (
            <div>
                <Menu />
                <Logo />
                <H3>Mes messages</H3>
                <DIV>
                    <Bar width="15%"/>
                    <Conversation width="75%"/>
                </DIV>
            </div>
        )
    }
}

export default Message