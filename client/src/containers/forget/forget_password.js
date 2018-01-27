import React, { Component } from 'react'
import styled from 'styled-components'
import {browserHistory} from 'react-router'
import axios from 'axios'

const END_POINT = "http://localhost:3000"
const Wrapper = styled.section`
width: 32%;
height: 300px;
margin: auto;
border: 1px rgb(224, 226, 227) solid;
border-radius: 4px;
box-shadow: rgba(0, 0, 0, 0.3) 20px 20px 20px;
background: rgba(255, 255, 255, 0.8);
`;
const Input = styled.input`
width: 40%;
background: white;
border: 1px rgb(224, 226, 227) solid;
box-shadow: -1px 0.4px 0.4px 0.4px rgba(0, 0, 0, 0.3) inset;
border-radius: 3px;
`;
const Button = styled.button`
color: palevioletred;
border: 1px solid palevioletred;
border-radius: 3px;
`;

class Forget extends Component {
    constructor(props) {
        super(props);
        this.state = {email: ""};
        this.info = this.info.bind(this);
        this.push = this.push.bind(this);
      }
      info(val) {
        this.setState({email: val})
      }
      push(e, email) {
        e.preventDefault();
        axios({ method: 'post',
        url: `${END_POINT}/forgetpass`,
        params: email
    })
      }
    render () {
        return (
            <Wrapper>
                 <form onSubmit={e => this.push(e, this.state.email)}>
                    <Input type="email" placeholder="Email" value={this.state.email} onChange={e => this.info(e.target.value)}/>
                    <Button type="submit">Valider</Button>
                 </form>
            </Wrapper>
        )
    }
}
export default (Forget)