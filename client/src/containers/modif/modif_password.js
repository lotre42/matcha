import React, { Component } from 'react'
import styled from 'styled-components'
import {browserHistory} from 'react-router'
import axios from 'axios'
// import bcrypt from 'bcrypt'

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

class Modifpass extends Component {
    constructor(props) {
        super(props);
        this.state = {email: ""};
        this.info = this.info.bind(this);
        this.push = this.push.bind(this);
      }
      info(val) {
        this.setState({password: val})
      }
      push(e, password, token) {
        e.preventDefault();
        // let hash = bcrypt.hashSync(password, 12);  
        axios({ method: 'post',
        url: `${END_POINT}/modifpass`,
        params: password,
        headers: { 'Authorization': token }
    })
      }
    render () {       
        return (
            <Wrapper>
                 <form onSubmit={e => this.push(e, this.state.password, this.props.location.query.token)}>
                    <Input type="password" placeholder="Password" value={this.state.password} onChange={e => this.info(e.target.value)}/>
                    <Button type="submit">Valider</Button>
                 </form>
            </Wrapper>
        )
    }
}
export default (Modifpass)