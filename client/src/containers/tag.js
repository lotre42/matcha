import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { connect } from 'react-redux'
// import {updateTag} from '../../actions/index'
import {readUser} from '../actions/index'
import { infoUser } from '../actions/user'
import { infoSearch } from '../actions/search'


const Div = styled.div`
    display: flex;
    align-items: center;
    // justify-content: space-between;
`;
const DIV = styled.div`
    // width: 10%;
    display: flex;
    justify-content: space-between;  
    font-family: Mothproofscriptregular;
      
`;
const P = styled.p`
    height: 10px;
    // font-weight: bold;
`;
const H2= styled.h2`
color: rgb(87,141,210);
`;
class Tag extends Component {
    render () {
        console.log("tag", this.props.users)        
        let tag = ["Sport", "Music", "Geek", "Tatouage", "Bouffe", "Etudiant", "Cinema", "Voyage", "Feignant", "Litterature", "Shopping"]
        // if (!this.props.users.Sport && !this.props.users.Music&&!this.props.users.Geek&&!this.props.users.Tatouage&&!this.props.users.Etudiant&&!this.props.users.Cinema&&!this.props.users.Voyage&&!this.props.users.Feignant&&!this.props.users.Litterature&&!this.props.users.Shopping)
        //          this.props.readUser(1)
        return (
                <DIV>
                    {
                        tag.map(t =>{
                            return(
                            <Div key={t}>
                            <P>#{t}:</P>
                            <input
                                key={t} 
                                type="checkbox"
                                onChange={this.props.value=="search" ? e => this.props.infoSearch(this.props.search, t, e.target.checked) : e => this.props.infoUser(this.props.users, t, e.target.checked, "tag")} 
                                checked={this.props.value=="search" ? this.props.search[t] : this.props.users.tag[t]}
                            />
                            </Div>
                            )
                            
                        })
                    }
                    {/* <button type="submit">coucou</button> */}
                    {/* </form> */}
                </DIV>
        )
    }
}
function mapStateToProps(state){
    // console.log("state",state)
    return{
    //    tags: state.tags,
       users: state.users,
       search: state.search
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({infoUser, readUser, infoSearch }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag)