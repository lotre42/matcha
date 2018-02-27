import React, { Component } from 'react'
import styled from 'styled-components'
import {loadMessage, updateMessage} from '../../actions/message'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client'
const END_POINT = "http://localhost:3000"


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
        const socket = socketIOClient(END_POINT)        
        socket.on('messages', (data) => {
            console.log("data", data)   
             })
        return (
            <Return>
                <form onSubmit={e => this.props.updateMessage(this.props.message, e, this.props.whomessage)}>                    
                    <Div>
                        {
                            this.props.allmessage.map(t => {
                                return(<Message disabled="disabled" >{t.message}</Message>)
                            })
                        }
                    </Div>
                    <Send>
                        <Text placeholder="Ecrivez votre message" onChange={e => this.props.loadMessage(e.target.value)}></Text>
                        <Validate>Envoyer</Validate>
                    </Send>
                </form>
        </Return>
        )
    }
}
function mapStateToProps(state){
    console.log("message", state.allmessage)
    return{
       message: state.loadmessage,
       allmessage: state.allmessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({loadMessage, updateMessage}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)
