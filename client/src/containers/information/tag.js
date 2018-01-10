import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { connect } from 'react-redux'
// import {updateTag} from '../../actions/index'
import {readUser} from '../../actions/index'
import {infoTag} from '../../actions/index'

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1.2px rgb(224, 226, 227) solid;
`;
const DIV = styled.div`
    width: 10%;
`;
const P = styled.p`
    height: 10px;
    font-family: Mothproofscriptregular;
`;
const H2= styled.h2`
color: rgb(87,141,210);
`;
class Tag extends Component {
    render () {
        // console.log(this.props.users)
        let tag = ["Sport", "Music", "Geek", "Tatouage", "Bouffe", "Etudiant", "Cinema", "Voyage", "Feigant", "Litterature", "Shopping"]
        // if (!this.props.users.Sport && !this.props.users.Music&&!this.props.users.Geek&&!this.props.users.Tatouage&&!this.props.users.Etudiant&&!this.props.users.Cinema&&!this.props.users.Voyage&&!this.props.users.Feignant&&!this.props.users.Litterature&&!this.props.users.Shopping)
        //          this.props.readUser(1)
        return (
            <DIV>
                <H2>Tag</H2>
                {
                    tag.map(t =>{
                        return(
                        <Div key={t}>
                        <P>#{t}:</P>
                        <input
                            key={t} 
                            type="checkbox"
                            onChange={e => this.props.infoTag(this.props.users, t, e.target.checked)} 
                            checked={this.props.users[t]} 
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
       users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({infoTag, readUser}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag)