import React, { Component } from 'react'
import Bar from './bar_message'
import Conversation from './conversation'
import Send from './send'
import Logo from '../../components/logo'
import Menu from '../../components/menu'
import styled from 'styled-components'
import {browserHistory} from 'react-router'
import { readUser } from '../../actions/user'
import { updateSocketMessage } from '../../actions/message'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'


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
        if (localStorage.getItem("token")){
            function isEmpty(obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key))
                        return false;
                }
                return true;
            }
            if (isEmpty(this.props.users.info))
            {
                this.props.readUser(1)
                return(<div></div>)
            }
            return (
                <div>
                    <Menu />
                    <Logo />
                    <H3>Mes messages</H3>
                    <DIV>
                        <Bar width="15%"/>
                        {this.props.viamessage == 0 ? <div>Selectionner discussion</div> :
                        <Conversation allmessage={this.props.allmessage} user={this.props.users} up={this.props.updateSocketMessage} who={this.props.whomessage} width="75%" />
                        }
                    </DIV>
                </div>
            )
    }
    else{
        return(
            <div>{browserHistory.push('/')}</div>
        )
    }
    }
}
function mapStateToProps(state){
    console.log(state)
    return{
       users: state.users,
       allmessage: state.allmessage,
       whomessage: state.whomessage,
       viamessage: state.viamessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({readUser, updateSocketMessage}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message)