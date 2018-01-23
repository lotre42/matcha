import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { searchLike, searchView, searchMatch } from '../../actions/search'
import Result from '../search/resultsearch'


const H3= styled.h3`
color: rgb(87,141,210);
font-family: Mothproofscriptregular;

`;
const Div= styled.div`
font-family: Mothproofscriptregular;
font-weight: bold;
`;
const Divresult = styled.div`
    display: flex;
    flex-wrap: wrap
    // justify-content: space-around;
`;

class Mypopularity extends Component {
    render () {
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        if (isEmpty(this.props.like))
        {
            this.props.searchLike()
        }
        if (isEmpty(this.props.match))
        {
            this.props.searchMatch()
        }
        if (isEmpty(this.props.view))
        {
            this.props.searchView()
        }
        let tab = [];
        for(let key in this.props.like) {
            tab.push(key);
        }
        let tab2 = [];
        for(let key in this.props.view) {
            tab2.push(key);
        }
        let tab3 = [];
        for(let key in this.props.match) {
            tab3.push(key);
        }
        return (
            <Div>
                <H3>Salut {this.props.users.info.prenom}</H3>
                <p>Ils vous correspondent:</p>
                <Divresult>
                    {tab3.map(t => {
                        return  <Result key={t} resultsinfo={this.props.match[t].info} resultstag={this.props.match[t].tag}/>
                        // <span key={t}><TAG>{t}</TAG></span>
                    })}
                </Divresult> 
                <p>Ils ont consultés votre profil:</p>
                <Divresult>
                    {tab2.map(t => {
                        return  <Result key={t} resultsinfo={this.props.view[t].info} resultstag={this.props.view[t].tag}/>
                        // <span key={t}><TAG>{t}</TAG></span>
                    })}
                </Divresult>                
                <p>Ils vous Like:</p>
                <Divresult>
                    {tab.map(t => {
                        return  <Result key={t} resultsinfo={this.props.like[t].info} resultstag={this.props.like[t].tag}/>
                        // <span key={t}><TAG>{t}</TAG></span>
                    })}
                </Divresult>
            </Div>
        )
    }
}

function mapStateToProps(state){
    console.log("state.users", state)
    return{
       users: state.users,
       like: state.like,
       results: state.results,
       view: state.view,
       match: state.match,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({searchLike, searchView, searchMatch}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mypopularity)