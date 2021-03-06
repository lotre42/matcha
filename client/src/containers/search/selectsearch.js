import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import { updateSearch, infoSearch, createSearch } from '../../actions/search'
import Tag from '../tag'


const Select = styled.select`
width: ${props => props.little ? '30%' : '45%'};
height: 32px;
background: white;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 4px;
`;
const DivDuo = styled.div`
    display: flex;
    height: 70px;
    justify-content: space-between;
`;
const DivSolo = styled.div`
    height: 70px;
    text-align:center;
`;
const H3= styled.h3`
color: rgb(87,141,210);
`;
const Divspan = styled.span`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
`;
const Span = styled.span`
    width: ${props => props.little ? '17.5%' : '45%'};
    font-weight: bold;
    font-family: Mothproofscriptregular;
`;
class Selectsearch extends Component {
    render () {
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        if (isEmpty(this.props.search))
        {
            this.props.createSearch()
        }
        return (
            <form onSubmit={e => this.props.updateSearch(this.props.search, e)}>
                <H3>Search Match</H3>
                <Divspan>
                        <Span>Age:</Span>
                        <Span>Orientation:</Span>
                </Divspan>
               <DivDuo>
                    <Select type="text" onChange={e => this.props.infoSearch(this.props.search, "age", e.target.value, "info")}>
                        <option  value="18-25">18-25</option>
                        <option value="25-35">25-35</option>
                        <option value="35-50">35-50</option>
                        <option value="50-99">50-99</option>
                    </Select>
                    <Select onChange={e => this.props.infoSearch(this.props.search, "orientation", e.target.value, "info")}>
                            <option value="Homosexuel">Homosexuel</option>
                            <option  value="Bisexuel">Bisexuel</option>
                            <option value="Heterosexuel">Heterosexuel</option>
                    </Select>
               </DivDuo> 
               <Divspan>
                        <Span>Sexe:</Span>
                        <Span>Distance:</Span>
                        <Span>Popupalite:</Span>                        
                </Divspan>
               <DivDuo>
                    <Select onChange={e => this.props.infoSearch(this.props.search, "sexe", e.target.value, "info")}>
                        <option value="Feminin">Femme</option>
                        <option value="Homme">Homme</option>
                    </Select>
                    <Select onChange={e => this.props.infoSearch(this.props.search, "distance", e.target.value, "info")}>
                        <option  value="20">Moins de 20km</option>
                        <option value="50">Moins 50km</option>
                        <option value="100">Moins 100km</option>
                        <option value="50000">Peu importe</option>
                    </Select>
                    <Select onChange={e => this.props.infoSearch(this.props.search, "pop", e.target.value, "info")}>
                        <option  value="0-1">Entre 0 et 5</option>                        
                        <option  value="0-1">Entre 0 et 1</option>
                        <option value="1-2">Entre 1 et 2</option>
                        <option value="2-3">Entre 2 et 3</option>
                        <option value="3-4">Entre 3 et 4</option>
                        <option value="4-5">Entre 4 et 5</option>                        
                    </Select>
               </DivDuo>
               <Divspan>
                    <Span>Tag:</Span>
                </Divspan>
               <Tag value="search"/>
               <button type="submit">valider</button>
            </form>
        )
    }
}
function mapStateToProps(state){
    console.log("u",state.results)
    return{
       search: state.search,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({updateSearch, infoSearch, createSearch}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Selectsearch)

