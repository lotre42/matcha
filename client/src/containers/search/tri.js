import React, { Component } from 'react'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { sorttab } from '../../actions/search'
import {browserHistory} from 'react-router'

const Titre = styled.span`
font-family: Mothproofscriptregular;
font-weight: bold;
`;
const Div = styled.div`
font-family: Mothproofscriptregular;
display: flex;
flex-direction: row-reverse;
// text-align: right;
`;
const Select = styled.select`
width: ${props => props.little ? '17.5%' : '45%'};
height: 32px;
background: white;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 4px;
`;
class Tri extends Component {
    render () {        
        return (
            <Div>
                <Select little type="text" onChange={e => this.props.sorttab(this.props.results, e.target.value)}>
                    <option value="aucun">Choisir</option>
                    <option value="age">Age</option>
                    <option value="pop">Popularite</option>
                    <option value="distance">Distance</option>
                </Select>
                <Titre>Trier par:</Titre>
            </Div>
        )
    }
}

function mapStateToProps(state){
    return{
       results: state.results,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({sorttab}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tri)
