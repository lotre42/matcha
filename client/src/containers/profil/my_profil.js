import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

const H3= styled.h3`
color: rgb(87,141,210);
`;
const Div= styled.div`
display: flex;
`;
const Img = styled.img`
 src : ${props => props.src};
 -moz-border-radius: 8px;
-webkit-border-radius: 8px;
-khtml-border-radius: 8px;
border-radius: 8px;
`;
class MyProfil extends Component {
    render () {
        return (
            <Div>
                <Img src={this.props.users.image.picture_4} width="200" height="200"/>
                <p>{this.props.users.info.username}</p>
            </Div>
        )
    }
}

function mapStateToProps(state){
    console.log("state.users", state)
    return{
       users: state.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfil)