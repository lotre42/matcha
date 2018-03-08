import React, { Component } from 'react'
import styled from 'styled-components'
import {loadMessage, updateMessage, updateSocketMessage} from '../../actions/message'
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
background-color: ${props => props.send != props.me ? '#eceff1' : 'rgb(87,141,210)'};
color: ${props => props.send != props.me ? 'black': 'white'};
max-width: 50%;
border-radius: 5px;
position: relative;
left: ${props => props.send != props.me ? '0%' : '50%'};
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
    constructor(props){
        super(props);
     this.socket = socketIOClient(END_POINT)        
    this.socket.on('messages', (data) => {
        let who = localStorage.getItem('who');
        if (props.user.info.id == data.id_receveur){
        //     // alert("message")
            if (data.id_envoyeur == who){
                props.up(props.allmessage, data.message, data.id_receveur, data.id_envoyeur)
                    this.forceUpdate()
            }
        }
         })
        }
    render () {
   
        return (
            <Return>
                <form onSubmit={e => this.props.updateMessage(this.props.allmessage,this.props.message, e, this.props.whomessage, this.props.user.info.id)}>                    
                    <Div>
                        {
                            this.props.allmessage.map(t => {
                                return(<Message send={t.id_envoyeur} me={this.props.user.info.id} disabled="disabled" >{t.message}</Message>)
                            })
                        }
                    </Div>
                    <Send>
                        <Text placeholder="Ecrivez votre message" value={this.props.message} onChange={e => this.props.loadMessage(e.target.value)}></Text>
                        <Validate onClick={e => setTimeout(() => {this.forceUpdate; this.props.loadMessage("")}, 100)}>Envoyer</Validate>
                    </Send>
                </form>
        </Return>
        )
    }
    
}
function mapStateToProps(state){
    return{
       message: state.loadmessage,
       allmessage: state.allmessage,
       whomessage: state.whomessage,
       user: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({loadMessage, updateMessage, updateSocketMessage}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)
