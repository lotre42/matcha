import React, { Component } from 'react'
import styled from 'styled-components'

const Div = styled.div`
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
overflow: scroll;
border-radius: 10px;
font-family: font-family: Mothproofscriptregular;
color; rgb(87,141,210);
display: flex;
flex-direction: column;
height: 90%;
`;
const Return = styled.div`
width:  85%;
height: 550px;
`;
const Send = styled.div`
display: flex;
height: 10%;
`;
const Message = styled.button`
background-color: ${props => props.right ? 'rgb(87,141,210)' : '#eceff1'};
color: ${props => props.right ? 'white' : 'black'};
max-width: 50%;
border-radius: 5px;
float: ${props => props.right ? 'right' : 'left'};
`;
const Validate = styled.button`
background: palevioletred;
color: white;
border: 1px solid palevioletred;
border-radius: 3px;
width: 10%;
`;
const Text = styled.textarea`
width: 90%;
background: white;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 4px;
`;
class Conversation extends Component {
    render () {
        return (
            <Return>
                <Div>
                    <div>
                    <Message disabled="disabled" >wech le bon vieu sava ou quoi</Message>
                    </div>
                    <div>
                    <Message disabled="disabled" >wech le bon vieu sava ou quoi</Message>
                    </div>
                    <div>                    
                    <Message disabled="disabled" >wech le bon vieu sava ou quoi >wech le bon vieu sava ou quoi>wech le bon vieu sava ou quoi>wech le bon vieu sava ou quoi</Message>
                    </div>
                    <div>                    
                    <Message right disabled="disabled" >wech le bon vieu sava ou quoi >wech le bon vieu sava ou quoi>wech le bon vieu sava ou quoi>wech le bon vieu sava ou quoi</Message>
                    </div>
                </Div>
                <Send>
                    <Text placeholder="Ecrivez votre message"></Text>
                    <Validate>Envoyer</Validate>
                </Send>
        </Return>
        )
    }
}

export default Conversation