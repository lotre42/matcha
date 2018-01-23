import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import { createResult } from '../../actions/index'
import {bindActionCreators} from 'redux'
import { infoProfil } from '../../actions/search'


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
const sInfo = styled.span`
font-weight: ${props => props.name ? 'bold' : ''};
text-align: center;
`;
const TAG = styled.button`
background: white;
color: palevioletred;
border: 2px solid palevioletred;
border-radius: 3px;
`;
// const Div = styled.div`
//     display: flex;
//     justify-content: space-between;
// `;
class Result extends Component {
    render () {
        // console.log("p",this.props)
        let tab = [];
        for(let key in this.props.resultstag) {
            tab.push(key);
                }
        return (
                    <Block>
                        {/* <button onClick={e => searchProfil(this.props.infoProfil)}>Acceder à son profil</button> */}
                        <Img src={this.props.resultsinfo.image} width="200" height="200"/>
                        <Info name>{this.props.resultsinfo.nom} {this.props.resultsinfo.prenom}</Info>
                        <sInfo>Age: {this.props.resultsinfo.age} ans <br />Sexe: {this.props.resultsinfo.sexe}</sInfo><br />
                        <sInfo>Distance: {this.props.resultsinfo.distance}km <br /> Orientation: {this.props.resultsinfo.orientation}</sInfo>
                        {tab.map(t => {
                                    return <span key={t}><TAG>{t}</TAG></span>
                                })}
                    </Block>
        )
    }
}

function mapStateToProps(state){
    console.log("image",state)
    return{
       results: state.results,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({infoProfil}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result)
