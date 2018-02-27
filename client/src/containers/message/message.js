import React, { Component } from 'react'
import Bar from './bar_message'
import Conversation from './conversation'
import Logo from '../../components/logo'
import Menu from '../../components/menu'
import styled from 'styled-components'
import {browserHistory} from 'react-router'
import { readUser } from '../../actions/user'
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
                        <Conversation width="75%"/>
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
    return{
       users: state.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({readUser}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message)