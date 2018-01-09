import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {updateTag} from '../../actions/index'
import {readTag} from '../../actions/index'
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
        let tag = ["Sport", "Music", "Geek", "Tatouage", "Bouffe", "Etudiant", "Cinema", "Voyage", "Feigant", "Litterature", "Shopping"]
        if (!this.props.tags.Sport && !this.props.tags.Music&&!this.props.tags.Geek&&!this.props.tags.Tatouage&&!this.props.tags.Etudiant&&!this.props.tags.Cinema&&!this.props.tags.Voyage&&!this.props.tags.Feignant&&!this.props.tags.Litterature&&!this.props.tags.Shopping)
                 this.props.readTag(1)
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
                            onChange={e => this.props.infoTag(this.props, t, e.target.checked)} 
                            checked={this.props.tags[t]} 
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
       tags: state.tags,
       users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({updateTag, infoTag, readTag}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag)