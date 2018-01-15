import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../../components/logo'
import Menu from '../../components/menu'
import Selectsearch from './selectsearch'
import Result from './resultsearch'
import { createResult } from '../../actions/index'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

const Div = styled.div`
`;
const Divresult = styled.div`
    display: flex;
    flex-wrap: wrap
    // justify-content: space-around;
`;
class Search extends Component {
    render () {
      
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return true;
            }
            return false;
        }
        // if (isEmpty(this.props.results))
        // {
        //     this.props.createResult()
        // }
        let tab = [];
        for(let key in this.props.results) {
            tab.push(key);
        }
        return (
            <Div>
                <Menu />
                <Logo />
                <Selectsearch />
                <Divresult>
                {isEmpty(tab) ? tab.map(t => {
                    return  <Result key={t} resultsinfo={this.props.results[t].info} resultstag={this.props.results[t].tag}/>
                    // <span key={t}><TAG>{t}</TAG></span>
                }) : isEmpty(tab)}
                </Divresult>
            </Div>
        )
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
        ...bindActionCreators({createResult}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
