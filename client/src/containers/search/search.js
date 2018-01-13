import React, { Component } from 'react'
import styled from 'styled-components'
import Logo from '../../components/logo'
import Selectsearch from './selectsearch'
import Result from './resultsearch'
import { createResult } from '../../actions/index'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'


class Search extends Component {
    render () {
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        if (isEmpty(this.props.results))
        {
            this.props.createResult()
        }
        return (
            <div>
                <Selectsearch />
                <Result />
            </div>
        )
    }
}
function mapStateToProps(state){
    console.log("image",state.results)
    return{
       results: state.results
    }
}
const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({createResult}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
