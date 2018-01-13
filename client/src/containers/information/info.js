import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {reduxForm} from 'redux-form'
import {infoUser} from '../../actions/index'
import {updateUser} from '../../actions/index'
import {readUser} from '../../actions/index'
import {bindActionCreators} from 'redux'
import { isNil } from 'lodash';
import Tag from '../tag'

import axios from 'axios'


const Input = styled.input`
width: 45%;
height: 32px;
background: white;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 4px;
`;
const Bio = styled.textarea`
// width: 45%;
// height: 32px;
background: white;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 4px;
`;

const Select = styled.select`
width: ${props => props.little ? '17.5%' : '45%'};
height: 32px;
background: white;
border: 1.2px rgb(224, 226, 227) solid;
border-radius: 4px;
`;
const Button = styled.button`
color: palevioletred;
border: 1px solid palevioletred;
border-radius: 3px;
`;

const DivInput = styled.div`
    display: flex;
    // align-items: center;
    height: 70px;
    justify-content: space-between;
`;
const Divbio = styled.div`
display: flex;
flex-direction: column;
`;
const Divtag = styled.div`
padding-top: 2%;
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
const H3= styled.h3`
color: rgb(87,141,210);
`;
class Info extends React.Component {
    render(){
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        let tab = [18];
        for (let i = 19; i<100; i++)
            tab.push(i);
        if (isEmpty(this.props.users))
        {
            this.props.readUser(1)
        }
        return(
                <form onSubmit={e => this.props.updateUser(this.props.users, e)}>
                    <H3>Information</H3>
                    <Divspan>
                        <Span>Username:</Span>
                        <Span>Email:</Span>
                    </Divspan>
                    <DivInput>
                        <Input 
                            type="text" 
                            onChange={e => this.props.infoUser(this.props.users, "username", e.target.value)}  
                            value={this.props.users.username}
                        />
                        <Input 
                            type="email" 
                            value={this.props.users.email}
                        />
                    </DivInput>
                     <Divspan>
                        <Span>Nom:</Span>
                        <Span>Prenom:</Span>
                    </Divspan>
                    <DivInput>
                        <Input 
                            type="text" 
                            onChange={e => this.props.infoUser(this.props.users, "nom", e.target.value)} 
                            value={this.props.users.nom}
                        />
                        <Input 
                            type="text" 
                            onChange={e => this.props.infoUser(this.props.users, "prenom", e.target.value)} 
                            value={this.props.users.prenom} 
                        />
                    </DivInput>
                    <Divspan>
                        <Span>Orientation-sexuelle:</Span>
                        <Span little>Age:</Span>
                        <Span little>Sexe:</Span>
                    </Divspan>
                    <DivInput>
                        <Select type="text" onChange={e => this.props.infoUser(this.props.users, "orientation", e.target.value)}>
                            <option value={this.props.users.orientation}>{this.props.users.orientation}</option>
                            <option  value="Bisexuel">Bisexuel</option>
                            <option value="Homosexuel">Homosexuel</option>
                            <option value="Heterosexuel">Heterosexuel</option>
                        </Select>
                        <Select little type="text" onChange={e => this.props.infoUser(this.props.users, "age", e.target.value)}>
                            <option value={this.props.users.age}>{this.props.users.age}</option>
                            {tab.map(t => {
                                return <option key={t} value={t}>{t}</option>
                            })}
                        </Select>
                        <Select little type="text" onChange={e => this.props.infoUser(this.props.users, "sexe", e.target.value)}>
                            <option value={this.props.users.sexe}>{this.props.users.sexe}</option>
                            <option value="Feminin">Feminin</option>
                            <option value="Masculin">Masculin</option>
                        </Select>
                    </DivInput> 
                    <Divbio>
                    <Span>Biographie:</Span>
                    <Bio 
                            type="text" 
                            onChange={e => this.props.infoUser(this.props.users, "bio", e.target.value)}  
                            value={this.props.users.bio}
                    />
                    </Divbio>
                    <Divtag>                    
                        <Span>Tag:</Span>
                        <Tag s/>
                    </Divtag>
                <button type="submit">valider</button>
                </form>
        );
    }
}
function mapStateToProps(state){
    // console.log("uusss",state.users.info)
    return{
       users: state.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({readUser, updateUser, infoUser}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Info)