import React from 'react'
import styled from 'styled-components'
import {browserHistory} from 'react-router'

const DivImg = styled.div`
text-align: center;
padding: 20px;
`;

const Img = styled.img`
    src: (${props => props.src});
`
const Logo = () => {
    return (
        <DivImg>
            <Img onClick={e => browserHistory.push('/')} src="../../style/retour2.png"/>
        </DivImg>
    )
}

export default Logo