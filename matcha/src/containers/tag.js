import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {updateTag} from '../actions/index'
import {infoTag} from '../actions/index'


const Select = styled.select`
width: ${props => props.little ? '17.5%' : '45%'};
height: 32px;
background: white;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 4px;
`;
const Input = styled.input`
width: 45%;
height: 32px;
background: white;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 4px;
`;
class Tag extends Component {
    render () {
        console.log("props",this.props.tags)
        let tag = ["Sport", "Music", "Geek", "Tatouage", "Bonne bouffe", "Etudiant", "Cinema", "Voyage", "Feigant", "Litterature", "Shopping"]
        return (
            <div>
                <form onSubmit={e => this.props.updateTag(this.props.tags, e)}>
                {
                    tag.map(t =>{
                        return(      
                        <Input
                            key={t} 
                            type="checkbox"
                            onChange={e => this.props.infoTag(this.props.tags, t, e.target.checked)} 
                            checked={this.props.tags.t} 
                        />)
                  
                    })
                }
                 <button type="submit">coucou</button>
                 </form>
            </div>
        )
    }
}
function mapStateToProps(state){
    // console.log("tag",state.tag)
    return{
       tags: state.tag,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({updateTag, infoTag}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag)