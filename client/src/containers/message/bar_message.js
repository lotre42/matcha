import styled from 'styled-components'
import React, { Component } from 'react'
import { updateReceveur } from '../../actions/message'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

const Div = styled.div`
width:  15%;
height: 550px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
overflow: scroll;
border-radius: 10px;
font-family: Apple Chancery, cursive;
font-size: large;
color; rgb(87,141,210);
`;
const Name = styled.button`
height: 40px;
border-bottom: 1px solid rgb(224, 226, 227);
text-align: center;
width: 100%;
background-color: white;
color: black;
:hover{
    background-color: rgb(87,141,210);
    color: white;
}
`;

class Message extends Component {
    render () {
        return (
                <Div>
                    {
                        this.props.idmessage.map(t => {
                            return (<Name onClick={e => this.props.updateReceveur(t)}>{t}</Name>)
                        })
                    }
                </Div>
        )
    }
}

function mapStateToProps(state){
    return{
       idmessage: state.idmessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({updateReceveur}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message)