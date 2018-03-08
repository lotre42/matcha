import {browserHistory} from 'react-router'
import React, { Component } from 'react'
import styled from 'styled-components'

const DivImg = styled.div`
text-align: center;
padding-top: 20px;
font-family: Mothproofscriptregular;
font-size: 100%;
`;
const Button = styled.button`
background: rgba(51, 118, 198, 0.8);
color: white;
border: 1px solid;
border-radius: 3px;
width: 32%;
`;


class Sign extends Component {
    render () {
        return (
        <DivImg>
            <Button onClick={e => browserHistory.push('/forgetpass')}>Mot de passe oublié</Button>
        </DivImg>
        )
    }
}

export default Sign
