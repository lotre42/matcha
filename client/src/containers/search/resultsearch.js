import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { createResult } from '../../actions/index'
import {bindActionCreators} from 'redux'



const Block = styled.div`
background: rgba(180, 190, 196, 0.3);
height: 400px;
width: 200px;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 10px;
font-family: Mothproofscriptregular;

`;
const Img = styled.img`
 src : ${props => props.src};
 -moz-border-radius: 8px;
-webkit-border-radius: 8px;
-khtml-border-radius: 8px;
border-radius: 8px;
`;
const Info = styled.p`
font-weight: ${props => props.name ? 'bold' : ''};
text-align: center;
`;
const TAG = styled.button`
background: white;
color: palevioletred;
border: 2px solid palevioletred;
border-radius: 3px;
`;

class Result extends Component {
    render () {
        let tab = [];
        for(let key in this.props.resultstag) {
            tab.push(key);
                }
        return (
                <Block>
                    <Img src={this.props.resultsinfo.image} width="200" height="200"/>
                    <Info name>{this.props.resultsinfo.nom} {this.props.resultsinfo.prenom}</Info>
                    <Info>Age:{this.props.resultsinfo.age}ans <br />Sexe:{this.props.resultsinfo.sexe}</Info>
                    <Info>Distance:{this.props.resultsinfo.distance} &nbsp;&nbsp; Orientation:{this.props.resultsinfo.orientation}</Info>
                    {tab.map(t => {
                                return <span key={t}><TAG>{t}</TAG></span>
                            })}
                </Block>
        )
    }
}
function mapStateToProps(state){
    console.log("image",state.results)
    return{
       resultsinfo: state.results.info,
       resultstag: state.results.tag,
    }
}
export default connect(mapStateToProps)(Result)