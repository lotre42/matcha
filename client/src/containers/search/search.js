import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../../components/logo'
import Menu from '../../components/menu'
import Selectsearch from './selectsearch'
import Result from './resultsearch'
// import { createResult } from '../../actions/index'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { infoProfil } from '../../actions/search'
import {browserHistory} from 'react-router'


const Div = styled.div`
`;
const Divresult = styled.div`
    display: flex;
    flex-wrap: wrap
    // justify-content: space-around;
`;
class Search extends Component {
    render () {
        function Empty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return true;
            }
            return false;
        }
        let tab = [];
        for(let key in this.props.results) {
            tab.push(key);
        }
        if (localStorage.getItem("token")){
        return (
            <Div>
                <Menu />
                <Logo />
                <Selectsearch />
                <Divresult>
                {Empty(tab) ? tab.map(t => {
                    return  <Result key={t} resultsinfo={this.props.results[t].info} resultstag={this.props.results[t].tag}/>
                    // <span key={t}><TAG>{t}</TAG></span>
                }) : Empty(tab)}
                </Divresult>
            </Div>
        )
    }
    else{
        return(<div>{browserHistory.push('/')}</div>)
    }
}
}
function mapStateToProps(state){
    console.log("image",state.profil)
    return{
       results: state.results,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({infoProfil}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
