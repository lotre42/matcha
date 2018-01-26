import styled from 'styled-components'
import React, { Component } from 'react'
import {browserHistory} from 'react-router'


const UL = styled.ul`
list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: rgba(224, 226, 227, 0.5);
    border-radius: 10px;
    font-family: Noto Sans, sans-serif;
    font-size: 18px;
`;
const LI = styled.li`
float: left;
    border-right:1px solid #bbb;
:last-child {
    border-right: none;
    float: right;
}
`;
const A = styled.a`
display: block;
color: black;
text-align: center;
padding: 14px 16px;
text-decoration: none;
:hover {
background-color: rgb(87,141,210);
}
`;

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick() {
        browserHistory.push('/')
        localStorage.removeItem("token");
      }
    render () {
        return (
            <nav>
    <UL>
      <LI><A onClick={e => browserHistory.push('/popularity')}>Popularité</A></LI>
      <LI><A onClick={e => browserHistory.push('/search')}>Match</A></LI>
      <LI><A onClick={e => browserHistory.push('/info')}>Mes Informations</A></LI>
      <LI><A onClick={e => browserHistory.push('/messages')}>Messages</A></LI>      
      <LI><A onClick={this.handleClick}>Deconnexion</A></LI>
    </UL>
</nav>
        )
    }
}

export default Menu