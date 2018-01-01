import React from 'react'
import styled from 'styled-components'

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
            <Img src="../../style/retour2.png"/>
        </DivImg>
    )
}

export default Logo