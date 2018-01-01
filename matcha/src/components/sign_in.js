import React from 'react'
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

const Sign = () => {
    return (
        <DivImg>
            <Button>Vous avez un compte? Connectez-vous</Button>
        </DivImg>
    )
}


export default Sign