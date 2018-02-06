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
import Tri from './tri'


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
                    return false;
            }
            return true;
        }
        console.log("test", this.props.results)
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
                {!Empty(this.props.results) ? <Tri /> : Empty(this.props.results)}                
                <Divresult>
                {!Empty(this.props.results) ? tab.map(t => {
                    return  <Result key={t} resultsinfo={this.props.results[t].info} resultstag={this.props.results[t].tag}/>
                }) : Empty(this.props.results)}
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
    console.log("image",state.results)
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
